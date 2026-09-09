/**
 * A dark, faintly reflective plaza beneath the tower — mostly there to give
 * the pillars' and floors' shadows a surface to land on near the hero and
 * overview waypoints. Fog and distance keep it invisible once the camera
 * moves past the lower floors, so it never has to be perfectly finished.
 */
export default function Ground() {
  return (
    <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[26, 64]} />
      <meshStandardMaterial color="#050505" roughness={0.35} metalness={0.5} envMapIntensity={0.6} />
    </mesh>
  )
}
