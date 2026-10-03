import ExpoModulesCore
import AVFoundation
import Vision
import UIKit
import ImageIO

private final class PatrolCamera: NSObject, AVCaptureVideoDataOutputSampleBufferDelegate, AVCaptureFileOutputRecordingDelegate {
  let session = AVCaptureSession()
  let movie = AVCaptureMovieFileOutput()
  let queue = DispatchQueue(label: "app.chpok.patrol.video")
  var onEvent: (([String: Any]) -> Void)?
  var onError: ((String) -> Void)?
  private var recording = false
  private var limiter = PatrolEventLimiter()
  private var lastFrameAt = Date.distantPast
  private var lastCandidateAt = Date.distantPast
  private var gate = PatrolPairGate()
  private var currentClip: URL?
  private let clipSeconds: TimeInterval = 6
  private let frameInterval: TimeInterval = 0.5
  private var recentFrames: [CVPixelBuffer] = []
  private var screenshots: [URL] = []
  private var active = false

  func start() throws {
    guard !session.isRunning else { return }
    guard AVCaptureDevice.authorizationStatus(for: .video) == .authorized else {
      throw NSError(domain: "ChpokPatrol", code: 1, userInfo: [NSLocalizedDescriptionKey: "Нет доступа к камере"])
    }
    guard let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back),
          let input = try? AVCaptureDeviceInput(device: device), session.canAddInput(input) else {
      throw NSError(domain: "ChpokPatrol", code: 2, userInfo: [NSLocalizedDescriptionKey: "Камера недоступна"])
    }
    session.beginConfiguration()
    session.sessionPreset = .hd1280x720
    session.addInput(input)
    let frames = AVCaptureVideoDataOutput()
    frames.alwaysDiscardsLateVideoFrames = true
    frames.setSampleBufferDelegate(self, queue: queue)
    if session.canAddOutput(frames) { session.addOutput(frames) }
    if session.canAddOutput(movie) { session.addOutput(movie) }
    if let connection = movie.connection(with: .video), connection.isVideoStabilizationSupported {
      connection.preferredVideoStabilizationMode = .auto
    }
    session.commitConfiguration()
    limiter.start(at: Date())
    active = true
    gate.reset()
    recentFrames.removeAll()
    lastCandidateAt = .distantPast
    queue.async { self.session.startRunning() }
  }

  func stop() {
    active = false
    queue.async {
      self.limiter.stop()
      if self.movie.isRecording { self.movie.stopRecording() }
      if self.session.isRunning { self.session.stopRunning() }
      self.session.beginConfiguration()
      for input in self.session.inputs { self.session.removeInput(input) }
      for output in self.session.outputs { self.session.removeOutput(output) }
      self.session.commitConfiguration()
      self.gate.reset()
      self.recentFrames.removeAll()
    }
  }

  func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
    guard active else { return }
    let now = Date()
    if limiter.isExpired(at: now) {
      onError?("Лимит сессии — 15 минут. Камера остановлена.")
      stop()
      return
    }
    guard now.timeIntervalSince(lastFrameAt) >= frameInterval, !recording,
          limiter.canAnalyze(at: now),
          let pixel = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
    lastFrameAt = now
    recentFrames.append(pixel)
    if recentFrames.count > 6 { recentFrames.removeFirst() }
    // Vision runs on-device. The classification score belongs to Apple's model, not to the riding hypothesis.
    let people = VNDetectHumanRectanglesRequest()
    let scene = VNClassifyImageRequest()
    scene.usesCPUOnly = false
    do {
      try VNImageRequestHandler(cvPixelBuffer: pixel, orientation: .right, options: [:]).perform([people, scene])
      let scooter = (scene.results ?? []).first { item in
        let label = item.identifier.lowercased()
        return (label.contains("scooter") || label.contains("kick scooter")) && item.confidence >= 0.5
      }
      let boxes = (people.results ?? []).filter { $0.confidence >= 0.5 }.map { $0.boundingBox }
      if gate.observe(scooterScene: scooter != nil, people: boxes) {
        let center = CGPoint(x: (boxes[0].midX + boxes[1].midX) / 2, y: (boxes[0].midY + boxes[1].midY) / 2)
        guard limiter.accept(at: now, center: center) else { return }
        lastCandidateAt = now
        saveFrames()
        startEventClip()
      }
    } catch { onError?("Анализ кадра: \(error.localizedDescription)") }
  }

  private func saveFrames() {
    let context = CIContext()
    for pixel in recentFrames.enumerated().filter({ $0.offset % 2 == 0 }).suffix(3).map({ $0.element }) {
      let image = CIImage(cvPixelBuffer: pixel)
      guard let data = context.jpegRepresentation(of: image, colorSpace: CGColorSpaceCreateDeviceRGB(), options: [kCGImageDestinationLossyCompressionQuality as CIImageRepresentationOption: 0.7]) else { continue }
      let file = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString + ".jpg")
      try? data.write(to: file, options: .atomic)
      screenshots.append(file)
    }
    recentFrames.removeAll()
  }

  private func startEventClip() {
    guard !movie.isRecording else { return }
    let file = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString + ".mov")
    currentClip = file
    recording = true
    movie.startRecording(to: file, recordingDelegate: self)
    queue.asyncAfter(deadline: .now() + clipSeconds) { [weak self] in
      guard let self = self else { return }
      if self.movie.isRecording { self.movie.stopRecording() }
    }
  }

  func fileOutput(_ output: AVCaptureFileOutput, didFinishRecordingTo outputFileURL: URL, from connections: [AVCaptureConnection], error: Error?) {
    recording = false
    guard active else {
      try? FileManager.default.removeItem(at: outputFileURL)
      for screenshot in screenshots { try? FileManager.default.removeItem(at: screenshot) }
      screenshots.removeAll()
      return
    }
    if let error = error { onError?("Клип: \(error.localizedDescription)"); return }
    let export = AVAssetExportSession(asset: AVURLAsset(url: outputFileURL), presetName: AVAssetExportPresetMediumQuality)
    let mp4 = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString + ".mp4")
    export?.outputURL = mp4
    export?.outputFileType = .mp4
    export?.exportAsynchronously { [weak self] in
      guard let self = self else { return }
      defer { try? FileManager.default.removeItem(at: outputFileURL) }
      guard export?.status == .completed, self.active else {
        try? FileManager.default.removeItem(at: mp4)
        for screenshot in self.screenshots { try? FileManager.default.removeItem(at: screenshot) }
        self.screenshots.removeAll()
        self.currentClip = nil
        if self.active { self.onError?("Не удалось подготовить MP4") }
        return
      }
      self.onEvent?([
        "id": UUID().uuidString,
        "occurredAt": self.lastCandidateAt.ISO8601Format(),
        "source": "iphone",
        "clipUri": mp4.absoluteString,
        "frameUris": self.screenshots.map { $0.absoluteString },
        "reason": "Apple Vision: метка самоката, пара людей и совместное движение на нескольких кадрах. Требуется проверка."
      ])
      self.screenshots.removeAll()
      self.currentClip = nil
    }
  }
}

public class ChpokPatrolModule: Module {
  private let camera = PatrolCamera()
  public func definition() -> ModuleDefinition {
    Name("ChpokPatrol")
    Events("onCandidate", "onPatrolError")
    AsyncFunction("requestCamera") { () -> Bool in
      if AVCaptureDevice.authorizationStatus(for: .video) == .authorized { return true }
      return await withCheckedContinuation { continuation in
        AVCaptureDevice.requestAccess(for: .video) { granted in continuation.resume(returning: granted) }
      }
    }
    AsyncFunction("startCamera") { () throws in
      camera.onEvent = { [weak self] event in self?.sendEvent("onCandidate", event) }
      camera.onError = { [weak self] message in self?.sendEvent("onPatrolError", ["message": message]) }
      try camera.start()
    }
    AsyncFunction("stopCamera") { () in camera.stop() }
    AsyncFunction("analyzeVideo") { (uri: String) throws -> [[String: Any]] in
      guard let url = URL(string: uri), url.isFileURL else { return [] }
      let asset = AVURLAsset(url: url)
      let duration = CMTimeGetSeconds(asset.duration)
      guard duration.isFinite && duration > 0 && duration <= 120 else {
        throw NSError(domain: "ChpokPatrol", code: 3, userInfo: [NSLocalizedDescriptionKey: "Для проверки выберите видео до 2 минут"])
      }
      let generator = AVAssetImageGenerator(asset: asset)
      generator.appliesPreferredTrackTransform = true
      var gate = PatrolPairGate()
      for second in stride(from: 0.0, through: duration, by: 0.5) {
        guard let image = try? generator.copyCGImage(at: CMTime(seconds: second, preferredTimescale: 600), actualTime: nil) else { continue }
        let people = VNDetectHumanRectanglesRequest()
        let scene = VNClassifyImageRequest()
        try VNImageRequestHandler(cgImage: image).perform([people, scene])
        let scooter = (scene.results ?? []).contains { ($0.identifier.lowercased().contains("scooter")) && $0.confidence >= 0.5 }
        let boxes = (people.results ?? []).filter { $0.confidence >= 0.5 }.map { $0.boundingBox }
        if gate.observe(scooterScene: scooter, people: boxes) {
          let at = second
          let start = max(0, at - 1)
          let end = min(duration, at + 6)
          let clip = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString + ".mp4")
          let export = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetMediumQuality)
          export?.outputURL = clip
          export?.outputFileType = .mp4
          export?.timeRange = CMTimeRange(start: CMTime(seconds: start, preferredTimescale: 600), duration: CMTime(seconds: end - start, preferredTimescale: 600))
          let semaphore = DispatchSemaphore(value: 0)
          export?.exportAsynchronously { semaphore.signal() }
          semaphore.wait()
          guard export?.status == .completed else { return [] }
          var frames: [String] = []
          for offset in [0.0, 1.0, 2.0] {
            guard let frame = try? generator.copyCGImage(at: CMTime(seconds: min(duration, at + offset), preferredTimescale: 600), actualTime: nil),
                  let bytes = UIImage(cgImage: frame).jpegData(compressionQuality: 0.7) else { continue }
            let file = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString + ".jpg")
            try? bytes.write(to: file, options: .atomic)
            frames.append(file.absoluteString)
          }
          return [["id": UUID().uuidString, "occurredAt": Date().ISO8601Format(), "source": "import", "clipUri": clip.absoluteString, "frameUris": frames, "reason": "Apple Vision: предварительный сигнал по последовательности кадров. Проверьте самокат и обоих людей вручную."]]
        }
      }
      return []
    }
  }
}
