import createRefHook from 'baseUI/functions/createRefHook'
import { RefObject, useEffect } from 'react'
import { MayArray } from 'typings/tools'
import parseRefs from '../functions/parseRefs'

export interface UseAnimateOptions {
  keyframes?: Parameters<Animatable['animate']>[0]
  options?: Parameters<Animatable['animate']>[1]
}

export const animateOptionKeys: Array<keyof UseAnimateOptions> = ['keyframes', 'options']

export default function useAnimate(
  ref: RefObject<MayArray<HTMLElement | null | undefined>>,
  options?: UseAnimateOptions
) {
  useEffect(() => {
    parseRefs(ref, (r) => r?.animate(options?.keyframes ?? null, options?.options))
  }, [])
}

// compose style
export const useAnimateRef = createRefHook(useAnimate)
