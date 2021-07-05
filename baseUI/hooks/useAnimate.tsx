import createRefHook from '../functions/createRefHook'
import { useEffect } from 'react'
import parseIRefs from '../functions/parseRefs'
import { IRefs } from 'baseUI/functions/mergeRefs'

export interface UseAnimateOptions {
  keyframes?: Parameters<Animatable['animate']>[0]
  options?: Parameters<Animatable['animate']>[1]
}


/**
 * component version: {@link #Animate todo}
 */
export default function useAnimate(
  domRefs: IRefs<HTMLElement>,
  options?: UseAnimateOptions
) {
  useEffect(() => {
    parseIRefs(domRefs, (r) => r.animate(options?.keyframes ?? null, options?.options))
  }, [])
}

// compose style
export const useAnimateRef = createRefHook(useAnimate)
