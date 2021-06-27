import createRefHook from '../functions/createRefHook'
import { RefObject, useEffect } from 'react'
import { MayArray } from 'typings/tools'
import parseIRefs from '../functions/parseRefs'

export interface UseAnimateOptions {
  keyframes?: Parameters<Animatable['animate']>[0]
  options?: Parameters<Animatable['animate']>[1]
}

export const animateOptionKeys: Array<keyof UseAnimateOptions> = ['keyframes', 'options']

/**
 * component version: {@link #_Animate todo}
 */
export default function useAnimate(
  ref: RefObject<MayArray<HTMLElement | null | undefined>>,
  options?: UseAnimateOptions
) {
  useEffect(() => {
    parseIRefs(ref, (r) => r.animate(options?.keyframes ?? null, options?.options))
  }, [])
}

// compose style
export const useAnimateRef = createRefHook(useAnimate)
