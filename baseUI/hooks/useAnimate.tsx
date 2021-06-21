import createRefHook from 'baseUI/functions/createRefHook'
import { RefObject, useEffect } from 'react'

export interface UseAnimateOptions {
  keyframes?: Parameters<Animatable['animate']>[0]
  options?: Parameters<Animatable['animate']>[1]
}
export default function useAnimate(
  ref: RefObject<HTMLElement | null | undefined>,
  options?: UseAnimateOptions
) {
  useEffect(() => {
    ref.current?.animate(options?.keyframes ?? null, options?.options)
  }, [])
} 


// TODO: 好像这个更申明式一些
export const useAnimateRef = createRefHook(useAnimate)