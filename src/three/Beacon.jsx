import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * A glowing marker above the roof — brightens as the section's own scroll
 * progress nears its end, giving the camera's pulled-back final shot a clear
 * focal point to land on.
 */
export default function Beacon({ progressRef }) {
  const light = useRef(null)
  const core = useRef(null)

  useFrame((state) => {
    const t = progressRef?.current ?? 0
    const near = Math.max(0, (t - 0.8) / 0.2)
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.08
    if (light.current) light.current.intensity = (4 + near * 20) * pulse
    if (core.current) {
      core.current.material.emissiveIntensity = (1.2 + near * 3) * pulse
      core.current.scale.setScalar(1 + near * 0.5)
    }
  })

  return (
    <group position={[0, 37.5, 0]}>
      <pointLight ref={light} color="#ffffff" intensity={4} distance={40} decay={1.6} />
      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
    </group>
  )
}
