import Foundation
import Vision

// Read-only macOS proxy for the two Vision requests used by the iOS pilot.
// Usage: swift evaluate-patrol-frames.swift path/to/frame1.png ...
for path in CommandLine.arguments.dropFirst() {
  let scene = VNClassifyImageRequest()
  let people = VNDetectHumanRectanglesRequest()
  do {
    try VNImageRequestHandler(url: URL(fileURLWithPath: path)).perform([scene, people])
    let matches = (scene.results ?? []).filter {
      $0.identifier.lowercased().contains("scooter") && $0.confidence >= 0.5
    }
    let top = (scene.results ?? []).prefix(3).map {
      "\($0.identifier):\(String(format: "%.3f", $0.confidence))"
    }.joined(separator: ",")
    let count = (people.results ?? []).filter { $0.confidence >= 0.5 }.count
    print("\(URL(fileURLWithPath: path).lastPathComponent)\tscooter=\(!matches.isEmpty)\tpeople=\(count)\ttop=\(top)")
  } catch {
    fputs("\(path): \(error)\n", stderr)
    exit(1)
  }
}
