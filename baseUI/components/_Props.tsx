import React from 'react'
import { DivProps } from './Div'
import { mergeProps } from 'baseUI/functions'
import mapReactChildren from './mapReactChildren'

interface _PropsProps extends DivProps {
  [propName: string]: any
}

export default function _Props({ children, ...restProps }: _PropsProps) {
  return mapReactChildren(children, (child) =>
    React.cloneElement(child, mergeProps(restProps, child.props))
  )
}
