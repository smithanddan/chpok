import Foundation
import CoreGraphics

// Geometry gate only. A scooter scene label is not an object association or violation verdict.
struct PatrolPairGate {
  private(set) var hits = 0
  private var previous: CGPoint?

  mutating func observe(scooterScene: Bool, people: [CGRect]) -> Bool {
    guard scooterScene, people.count == 2 else { reset(); return false }
    let a = people[0], b = people[1]
    guard abs(a.midX - b.midX) < 0.25,
          abs(a.minY - b.minY) < 0.17,
          abs(a.height - b.height) < 0.35 else { reset(); return false }
    let current = CGPoint(x: (a.midX + b.midX) / 2, y: (a.midY + b.midY) / 2)
    if let previous = previous {
      let travel = hypot(current.x - previous.x, current.y - previous.y)
      hits = travel > 0.012 && travel < 0.18 ? hits + 1 : 0
    }
    previous = current
    if hits >= 3 { reset(); return true }
    return false
  }
  mutating func reset() { hits = 0; previous = nil }
}
