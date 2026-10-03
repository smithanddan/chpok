import Foundation
import CoreGraphics

struct PatrolEventLimiter {
  private(set) var startedAt: Date?
  private var lastEventAt: Date?
  private var lastCenter: CGPoint?
  let sessionLimit: TimeInterval = 900
  let cooldown: TimeInterval = 30
  let sameSpotWindow: TimeInterval = 90

  mutating func start(at date: Date) {
    startedAt = date
    lastEventAt = nil
    lastCenter = nil
  }
  mutating func stop() { startedAt = nil; lastEventAt = nil; lastCenter = nil }
  func isExpired(at date: Date) -> Bool { guard let startedAt = startedAt else { return true }; return date.timeIntervalSince(startedAt) >= sessionLimit }
  func canAnalyze(at date: Date) -> Bool { guard !isExpired(at: date) else { return false }; return lastEventAt.map { date.timeIntervalSince($0) >= cooldown } ?? true }
  mutating func accept(at date: Date, center: CGPoint) -> Bool {
    guard canAnalyze(at: date) else { return false }
    if let lastEventAt = lastEventAt, let lastCenter = lastCenter,
       date.timeIntervalSince(lastEventAt) < sameSpotWindow,
       hypot(center.x - lastCenter.x, center.y - lastCenter.y) < 0.15 { return false }
    lastEventAt = date
    lastCenter = center
    return true
  }
}
