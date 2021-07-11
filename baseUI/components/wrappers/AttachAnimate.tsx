import { createRefHook, mergeProps } from 'baseUI/functions'
import React, { MutableRefObject, ReactNode, useEffect } from 'react'
import Ex from './Ex'

//#region ------------------- hook: useAnimate -------------------
export interface UseAnimateOptions {
  keyframes?: Parameters<Animatable['animate']>[0]
  options?: Parameters<Animatable['animate']>[1]
}

/**
 * component version: {@link #Animate todo}
 */
export function useAnimate(ref: MutableRefObject<HTMLElement>, options?: UseAnimateOptions) {
  useEffect(() => {
    ref.current.animate?.(options?.keyframes ?? null, options?.options)
  }, [])
}

// compose style
export const useAnimateRef = createRefHook(useAnimate)

//#endregion

export interface AttachAnimateProps extends UseAnimateOptions {
  children?: ReactNode
}
export interface AttachAnimateInjectProps {
  isAnimating?: boolean
}

/**
 * @WrapperComponent a wrapper for web animation API
 */
export default function AttachAnimate({
  children,
  keyframes,
  options,
  /*  $debugProps, */ ...restProps
}: AttachAnimateProps) {
  const [animateRef] = useAnimateRef({ keyframes, options })
  return <Ex {...mergeProps(restProps, { domRef: animateRef })}>{children}</Ex>
}
