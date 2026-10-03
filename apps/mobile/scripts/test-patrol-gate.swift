import Foundation
import CoreGraphics

func people(_ shift: CGFloat) -> [CGRect] {
  [CGRect(x: 0.30 + shift, y: 0.30, width: 0.18, height: 0.42), CGRect(x: 0.43 + shift, y: 0.32, width: 0.18, height: 0.40)]
}
func check(_ condition: Bool, _ name: String) { if !condition { fatalError(name) } }
@main struct PatrolGateTests {
static func main() {
var moving = PatrolPairGate()
check(!moving.observe(scooterScene: true, people: people(0)), "first frame")
check(!moving.observe(scooterScene: true, people: people(0.03)), "second frame")
check(!moving.observe(scooterScene: true, people: people(0.06)), "third frame")
check(moving.observe(scooterScene: true, people: people(0.09)), "moving pair candidate")
var stopped = PatrolPairGate()
for _ in 0..<6 { check(!stopped.observe(scooterScene: true, people: people(0)), "stopped pair") }
var walkers = PatrolPairGate()
for index in 0..<6 { check(!walkers.observe(scooterScene: false, people: people(CGFloat(index) * 0.03)), "no scooter label") }
var adjacentScooters = PatrolPairGate()
for index in 0..<6 {
  let boxes = people(CGFloat(index) * 0.03) + [CGRect(x: 0.65, y: 0.3, width: 0.1, height: 0.4), CGRect(x: 0.75, y: 0.3, width: 0.1, height: 0.4)]
  check(!adjacentScooters.observe(scooterScene: true, people: boxes), "two visible scooters")
}
var passerby = PatrolPairGate()
for index in 0..<6 {
  let boxes = people(CGFloat(index) * 0.03) + [CGRect(x: 0.8, y: 0.3, width: 0.1, height: 0.4)]
  check(!passerby.observe(scooterScene: true, people: boxes), "visible passerby")
}
print("PatrolPairGate synthetic checks passed")
var limiter = PatrolEventLimiter()
let origin = Date(timeIntervalSince1970: 1000)
limiter.start(at: origin)
check(limiter.accept(at: origin, center: CGPoint(x: 0.4, y: 0.5)), "first event")
check(!limiter.accept(at: origin.addingTimeInterval(20), center: CGPoint(x: 0.8, y: 0.5)), "cooldown")
check(!limiter.accept(at: origin.addingTimeInterval(45), center: CGPoint(x: 0.42, y: 0.5)), "same event")
check(limiter.accept(at: origin.addingTimeInterval(46), center: CGPoint(x: 0.8, y: 0.5)), "different event")
check(limiter.isExpired(at: origin.addingTimeInterval(900)), "session limit")
limiter.stop()
check(!limiter.canAnalyze(at: origin.addingTimeInterval(47)), "stopped session")
print("PatrolEventLimiter synthetic checks passed")
}
}
