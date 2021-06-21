import React, { ReactNode } from 'react'
import { omit } from 'utils/functions/object'
import { UseAnimateOptions, useAnimateRef } from '../hooks/useAnimate'
import _DomRef from './_DomRef'


export default function Animate(props: { domRef?: any; children?: ReactNode } & UseAnimateOptions) {
  const ref = useAnimateRef(omit(props, 'children'))
  return <_DomRef domRef={[props.domRef, ref]}>{props.children}</_DomRef>
}
