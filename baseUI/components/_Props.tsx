import React from 'react'
import { DivProps } from './Div'
import _DomRef from './_DomRef'

interface _PropsProps extends DivProps {
  [propName: string]: any
}

export default function _Props({ children, ...restProps }: _PropsProps) {
  return <_DomRef {...restProps}>{children}</_DomRef>
}
