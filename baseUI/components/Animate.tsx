import React, { ReactNode, useRef } from 'react'
import { omit } from 'utils/functions/object'
import { UseAnimateOptions, useAnimate } from '../hooks/useAnimate'
import _DomRef from './_DomRef'

export default function Animate(props: { children?: ReactNode } & UseAnimateOptions) {
  const ref = useRef<HTMLElement>()
  useAnimate(ref, omit(props, 'children'))
  return <_DomRef domRef={ref}>{props.children}</_DomRef>
}

