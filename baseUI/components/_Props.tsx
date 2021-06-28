import React from 'react'
import { DivProps } from './Div'
import { mergeProps } from 'baseUI/functions'
import mapReactChildren from './mapReactChildren'

interface _PropsProps extends DivProps {
  [propName: string]: any
}

export default function _Props({ children, ...restProps }: _PropsProps) {
  return mapReactChildren(children, (
    child // TODO: 感觉还是有点冗余啊
  ) => React.cloneElement(child, mergeProps(restProps, child.props)))
}
