import React, { ReactNode } from 'react'
import { omit } from 'utils/functions/object'
import { animateOptionKeys, UseAnimateOptions, useAnimateRef } from '../../hooks/useAnimate'
import Ex from './Ex'

interface AnimateProps extends UseAnimateOptions {
  children?: ReactNode
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
