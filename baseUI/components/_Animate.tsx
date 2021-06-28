import React from 'react'
import { omit } from 'utils/functions/object'
import { animateOptionKeys, UseAnimateOptions, useAnimateRef } from '../hooks/useAnimate'
import { DivProps } from './Div'
import cloneElement from './mapReactChildren'
import _DomRef from './_DomRef'

interface _AnimateProps extends DivProps, UseAnimateOptions {
  [propName: string]: any
}

export default function _Animate({ children, ...restProps }: _AnimateProps) {
  return cloneElement(children, (child) => (
    <_DomRef {...omit(restProps, animateOptionKeys)} exRef={useAnimateRef(restProps)}>
      {child}
    </_DomRef>
  ))
}
