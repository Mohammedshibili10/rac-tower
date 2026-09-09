import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import Tower, { TOWER_TOP } from './Tower'
import Ground from './Ground'
import Particles from './Particles'
import Beacon from './Beacon'
import CameraRig, { WAYPOINTS } from './CameraRig'
import { prefersReducedMotion } from '../lib/smoothScroll'

function useIsMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = (e) => setMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

/** A slow, continuous turn tied to the section's own scroll progress —
 * literal "object rotates as you scroll", layered under the camera's own
 * flight rather than replacing it. */
function RotatingTower({ progressRef, mobile }) {
  const group = useRef(null)
  useFrame((_, delta) => {
    if (!group.current) return
    const target = (progressRef.current ?? 0) * 0.6
    group.current.rotation.y += (target - group.current.rotation.y) * Math.min(1, delta * 1.5)
  })
  return (
    <group ref={group}>
      <Tower />
      <Beacon progressRef={progressRef} />
    </group>
  )
}

/**
 * The WebGL scene for the Immersive section only — not a page-spanning
 * backdrop. Fills whatever ancestor positions it (see ImmersiveSection.jsx,
 * which sizes and pins the container this sits inside).
 */
export default function Experience({ progressRef }) {
  const fogRef = useRef(null)
  const mobile = useIsMobile()
  const reduced = useRef(prefersReducedMotion()).current

  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      camera={{ fov: 48, near: 0.1, far: 220, position: WAYPOINTS[0].pos }}
      className="absolute inset-0"
    >
      <color attach="background" args={['#000000']} />
      <fogExp2 ref={fogRef} attach="fog" args={['#000000', WAYPOINTS[0].fog]} />

      <ambientLight intensity={0.24} />
      <directionalLight position={[14, 30, 10]} intensity={0.55} color="#ffffff" />
      <directionalLight position={[-10, 6, -14]} intensity={0.2} color="#ffffff" />

      <Particles lowPower={mobile} />
      <Ground />
      <RotatingTower progressRef={progressRef} mobile={mobile} />
      <CameraRig progressRef={progressRef} fogRef={fogRef} />

      {!reduced && !mobile && (
        <EffectComposer enableNormalPass={false}>
          <Bloom intensity={0.6} luminanceThreshold={0.22} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>
      )}
    </Canvas>
  )
}

export { TOWER_TOP }
