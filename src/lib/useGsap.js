import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Scopes a GSAP setup function to a ref via gsap.context(), so every tween,
 * timeline and ScrollTrigger created inside `setup` is automatically
 * reverted (and any ScrollTriggers killed) on unmount or when `deps` change.
 * This is the standard React+GSAP pairing — without it, ScrollTriggers from
 * a section that has since unmounted keep firing against stale elements.
 */
export function useGsapContext(setup, deps = []) {
  const scope = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(setup, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return scope
}
