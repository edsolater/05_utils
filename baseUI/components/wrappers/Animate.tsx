import React from 'react'
import { omit } from 'utils/functions/object'
import { animateOptionKeys, UseAnimateOptions, useAnimateRef } from '../../hooks/useAnimate'
import { WrapperProps, DivProps } from '../baseProps'
import DomRef from './DomRef'

interface AnimateProps extends DivProps, WrapperProps, UseAnimateOptions {
  // $debugProps?: Array<boolean | keyof AnimateProps, cb: >// TODO
}

/**
 * @WrapperComponent a wrapper for web animation API
 */
export default function Animate({ children, /*  $debugProps, */ ...restProps }: AnimateProps) {
  const [animateRef] = useAnimateRef(restProps)
  return (
    <DomRef {...omit(restProps, animateOptionKeys)} exDomRef={animateRef}>
      {children}
    </DomRef>
  )
}
