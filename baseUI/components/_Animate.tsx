import React from 'react'
import { omit } from 'utils/functions/object'
import { animateOptionKeys, UseAnimateOptions, useAnimateRef } from '../hooks/useAnimate'
import assertSigleChild from '../functions/assertSigleChild'
import { DivProps } from './Div'
import _DomRef from './_DomRef'

interface _AnimateProps extends DivProps, UseAnimateOptions {}

export default function _Animate({ children, ...restProps }: _AnimateProps) {
  assertSigleChild(children, _Animate.name)

  const ref = useAnimateRef(restProps)
  return (
    <_DomRef {...omit(restProps, animateOptionKeys)} _domRef={ref}>
      {children}
    </_DomRef>
  )
}
