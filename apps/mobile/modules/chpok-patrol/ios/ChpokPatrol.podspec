Pod::Spec.new do |s|
  s.name = 'ChpokPatrol'
  s.version = '0.1.0'
  s.summary = 'On-device patrol camera and evidence capture'
  s.description = s.summary
  s.license = 'MIT'
  s.author = 'Chpok'
  s.homepage = 'https://example.invalid/chpok'
  s.platform = :ios, '15.1'
  s.source = { :git => 'https://example.invalid/chpok.git', :tag => s.version.to_s }
  s.static_framework = true
  s.dependency 'ExpoModulesCore'
  s.source_files = '**/*.swift'
  s.swift_version = '5.9'
end
