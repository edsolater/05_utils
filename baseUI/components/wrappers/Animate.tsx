import React, { ReactNode } from 'react'
import { omit } from 'utils/functions/object'
import { animateOptionKeys, UseAnimateOptions, useAnimateRef } from '../../hooks/useAnimate'
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
export default function Animate({ children, /*  $debugProps, */ ...restProps }: AnimateProps) {
  const [animateRef] = useAnimateRef(restProps)
  return (
    <Ex {...omit(restProps, animateOptionKeys)} exDomRef={animateRef}>
      {children}
    </Ex>
  )
}
