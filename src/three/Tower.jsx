import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * A procedural tower, built from hollow floor frames and corner pillars
 * rather than solid walls.
 *
 * The camera flies through this structure, so solid geometry would have to
 * be hollowed out or culled to avoid clipping into walls; open frames sidestep
 * that entirely; the camera can glide through the open faces while the frame
 * edges still read clearly as "floors" against the fog.
 *
 * TOTAL_FLOORS spans the tower's full height in world units; CameraRig's
 * waypoints are written in the same coordinate space.
 */
export const TOTAL_FLOORS = 12
export const FLOOR_HEIGHT = 3
export const TOWER_TOP = TOTAL_FLOORS * FLOOR_HEIGHT

function FloorFrame({ y, size, rotation, emphasis = false }) {
  const half = size / 2
  const beamThickness = 0.06
  const beamDepth = 0.16

  // Four beams forming a square perimeter, rather than a generated edges
  // geometry — this keeps the beams themselves emissive and lets each one
  // brighten independently near the "emphasis" floors called out below.
  const beams = useMemo(
    () => [
      { pos: [0, 0, -half], args: [size, beamThickness, beamDepth] },
      { pos: [0, 0, half], args: [size, beamThickness, beamDepth] },
      { pos: [-half, 0, 0], args: [beamDepth, beamThickness, size] },
      { pos: [half, 0, 0], args: [beamDepth, beamThickness, size] },
    ],
    [size, half],
  )

  return (
    <group position={[0, y, 0]} rotation={[0, rotation, 0]}>
      {beams.map((b, i) => (
        <mesh key={i} position={b.pos} castShadow receiveShadow>
          <boxGeometry args={b.args} />
          <meshStandardMaterial
            color="#e8e8e8"
            emissive="#ffffff"
            emissiveIntensity={emphasis ? 0.9 : 0.35}
            roughness={0.3}
            metalness={0.4}
            envMapIntensity={1.1}
            toneMapped={false}
          />
        </mesh>
      ))}
      {/* A faint slab so each floor still reads as a surface, not just an
          outline — kept nearly transparent so it never occludes the camera.
          Receives the beams' shadows but casts none of its own: at this
          opacity a self-shadow would just read as a smudge. */}
      <mesh position={[0, -beamThickness / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[size * 0.98, size * 0.98]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.025}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function Pillars({ radius, height }) {
  const corners = useMemo(() => {
    const pts = []
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 4
      pts.push([Math.cos(angle) * radius, Math.sin(angle) * radius])
    }
    return pts
  }, [radius])

  return (
    <group>
      {corners.map(([x, z], i) => (
        <mesh key={i} position={[x, height / 2, z]} castShadow receiveShadow>
          <boxGeometry args={[0.14, height, 0.14]} />
          <meshStandardMaterial
            color="#dedede"
            emissive="#ffffff"
            emissiveIntensity={0.25}
            roughness={0.35}
            metalness={0.45}
            envMapIntensity={1.1}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Tower() {
  // Each floor is a touch narrower than the last and gently rotated, giving
  // the tower a slight twist rather than a static extruded box — visible as
  // the camera drifts past at close range without needing any animation.
  const floors = useMemo(
    () =>
      Array.from({ length: TOTAL_FLOORS }, (_, i) => ({
        y: i * FLOOR_HEIGHT + FLOOR_HEIGHT / 2,
        size: 9 - i * 0.12,
        rotation: i * 0.05,
        emphasis: i % 3 === 0,
      })),
    [],
  )

  return (
    <group>
      <Pillars radius={4.3} height={TOWER_TOP} />
      {floors.map((f, i) => (
        <FloorFrame key={i} {...f} />
      ))}
      {/* Roof cap */}
      <mesh position={[0, TOWER_TOP + 0.3, 0]}>
        <boxGeometry args={[8, 0.25, 8]} />
        <meshStandardMaterial
          color="#f2f2f2"
          emissive="#ffffff"
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
