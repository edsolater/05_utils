import React from 'react'
import { omit } from 'utils/functions/object'
import { animateOptionKeys, UseAnimateOptions, useAnimateRef } from '../hooks/useAnimate'
import { DivProps } from './Div'
import _DomRef from './_DomRef'
import _Props from './_Props'

interface _AnimateProps extends DivProps, UseAnimateOptions {
  [propName: string]: any
}

export default function _Animate({ children, ...restProps }: _AnimateProps): JSX.Element {
  // @ts-expect-error should use JSX.Element insteadof ReactNode. it's an editor error but never mind
  return React.Children.map(children, (child) => (
    <_DomRef {...omit(restProps, animateOptionKeys)} _domRef={useAnimateRef(restProps)}>
      {child}
    </_DomRef>
  ))
}
