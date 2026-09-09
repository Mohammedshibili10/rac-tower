import { Stars, Sparkles } from '@react-three/drei'

/**
 * Background and foreground depth cues.
 *
 * Stars sit far behind the tower and barely move relative to the camera —
 * the classic cue that something is very distant. Sparkles drift close to
 * the tower itself, giving the middle distance a sense of floating dust/light
 * that reacts to the camera passing through it. Both are monochrome
 * (saturation 0 / white) to hold the site's black-and-white palette.
 */
export default function Particles({ lowPower = false }) {
  return (
    <>
      <Stars
        radius={90}
        depth={60}
        count={lowPower ? 1200 : 3500}
        factor={3.2}
        saturation={0}
        fade
        speed={0.4}
      />
      <Sparkles
        count={lowPower ? 60 : 160}
        scale={[26, 40, 26]}
        position={[0, 18, 0]}
        size={1.6}
        speed={0.25}
        opacity={0.5}
        color="#ffffff"
      />
    </>
  )
}
