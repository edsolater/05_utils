import { mergeProps } from 'baseUI/functions'
import React, { ReactNode } from 'react'
import { UseAnimateOptions, useAnimateRef } from '../../hooks/useAnimate'
import Ex from './Ex'

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
