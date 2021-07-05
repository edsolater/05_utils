import { mergeProps } from 'baseUI/functions'
import React, { ReactNode } from 'react'
import { UseAnimateOptions, useAnimateRef } from '../../hooks/useAnimate'
import Ex from './Ex'

export interface AnimateProps extends UseAnimateOptions {
  children?: ReactNode
}
export interface AnimateInjectProps {
  isAnimating?: boolean
}

/**
 * @WrapperComponent a wrapper for web animation API
 */
export default function Animate({
  children,
  keyframes,
  options,
  /*  $debugProps, */ ...restProps
}: AnimateProps) {
  const [animateRef] = useAnimateRef({ keyframes, options })
  return <Ex {...mergeProps(restProps, { domRef: animateRef })}>{children}</Ex>
}
