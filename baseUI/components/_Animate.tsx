import React from 'react'
import { omit, pick } from 'utils/functions/object'
import { animateOptionKeys, UseAnimateOptions, useAnimateRef } from '../hooks/useAnimate'
import { DivProps } from './Div'
import _DomRef from './_DomRef'

interface _AnimateProps extends DivProps, UseAnimateOptions {}

export default function _Animate(props: _AnimateProps) {
  const ref = useAnimateRef(pick(props, animateOptionKeys))
  return <_DomRef {...omit(props, animateOptionKeys)} _domRef={ref} />
}
