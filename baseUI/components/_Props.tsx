import React from 'react'
import { DivProps } from './Div'
import { mergeProps } from 'baseUI/functions'
import cloneElement from './mapReactChildren'

interface _PropsProps extends DivProps {
  [propName: string]: any
}

export default function _Props({ children, ...restProps }: _PropsProps) {
  return cloneElement(children, (child) => <child.type {...mergeProps(child.props, restProps)} />)
}
