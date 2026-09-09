import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { prefersReducedMotion } from '../lib/smoothScroll'

/**
 * A short cinematic flight through the tower, used only inside the
 * Immersive section (see ImmersiveSection.jsx). `progressRef` is that
 * section's own local scroll progress — 0 where the section is pinned into
 * place, 1 where the pin releases — not the whole page's scroll position, so
 * this camera's journey is self-contained to its one scene.
 */
const WAYPOINTS = [
  { t: 0.0, pos: [0, 3, 20], look: [0, 6, 0], fog: 0.026 }, // establishing shot
  { t: 0.22, pos: [5, 6, 11], look: [0, 7, 0], fog: 0.03 }, // approaching the facade
  { t: 0.45, pos: [-2.4, 9.5, 0.3], look: [2, 10, -5], fog: 0.045 }, // first floor
  { t: 0.7, pos: [2.4, 16.5, 0.3], look: [-2, 17, -5], fog: 0.045 }, // rising through
  { t: 0.88, pos: [0, 24, 6], look: [0, 26, 0], fog: 0.02 }, // near the top
  { t: 1.0, pos: [10, 34, 22], look: [0, 16, 0], fog: 0.012 }, // pulled back, full silhouette
]

function smoothstep(edge0, edge1, x) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

function sample(t, outPos, outLook) {
  const last = WAYPOINTS.length - 1
  if (t <= WAYPOINTS[0].t) {
    outPos.set(...WAYPOINTS[0].pos)
    outLook.set(...WAYPOINTS[0].look)
    return WAYPOINTS[0].fog
  }
  if (t >= WAYPOINTS[last].t) {
    outPos.set(...WAYPOINTS[last].pos)
    outLook.set(...WAYPOINTS[last].look)
    return WAYPOINTS[last].fog
  }
  let i = 0
  while (i < last && WAYPOINTS[i + 1].t < t) i++
  const a = WAYPOINTS[i]
  const b = WAYPOINTS[i + 1]
  const u = smoothstep(a.t, b.t, t)
  outPos.set(
    THREE.MathUtils.lerp(a.pos[0], b.pos[0], u),
    THREE.MathUtils.lerp(a.pos[1], b.pos[1], u),
    THREE.MathUtils.lerp(a.pos[2], b.pos[2], u),
  )
  outLook.set(
    THREE.MathUtils.lerp(a.look[0], b.look[0], u),
    THREE.MathUtils.lerp(a.look[1], b.look[1], u),
    THREE.MathUtils.lerp(a.look[2], b.look[2], u),
  )
  return THREE.MathUtils.lerp(a.fog, b.fog, u)
}

export default function CameraRig({ progressRef, fogRef }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(...WAYPOINTS[0].pos))
  const targetLook = useRef(new THREE.Vector3(...WAYPOINTS[0].look))
  const currentLook = useRef(new THREE.Vector3(...WAYPOINTS[0].look))
  const pointer = useRef({ x: 0, y: 0 })
  const reduced = useRef(prefersReducedMotion()).current

  useEffect(() => {
    if (reduced || typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  useFrame((_, delta) => {
    const t = progressRef.current ?? 0
    const fogDensity = sample(t, targetPos.current, targetLook.current)

    // A small, fast-converging ease — just enough to smooth frame-to-frame
    // jitter, not enough to read as delayed or "stuck" scroll response.
    const damp = reduced ? 1 : 1 - Math.pow(0.00001, delta)
    camera.position.lerp(targetPos.current, damp)
    currentLook.current.lerp(targetLook.current, damp)

    const parallaxX = reduced ? 0 : pointer.current.x * 0.5
    const parallaxY = reduced ? 0 : pointer.current.y * 0.3

    camera.lookAt(
      currentLook.current.x + parallaxX,
      currentLook.current.y + parallaxY,
      currentLook.current.z,
    )

    if (fogRef.current) {
      fogRef.current.density = THREE.MathUtils.lerp(fogRef.current.density, fogDensity, damp)
    }
  })

  return null
}

export { WAYPOINTS }
