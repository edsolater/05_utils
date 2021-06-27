import React, { isValidElement } from 'react'
import { DivProps } from './Div'
import { mergeProps } from 'baseUI/functions'

interface _PropsProps extends DivProps {
  [propName: string]: unknown
}

export default function _Props({ children, ...restProps }: _PropsProps): JSX.Element {
  // @ts-expect-error React.Children.map() 返回的不是 JSX element 。为什么呢？
  return React.Children.map(children, (child) =>
    isValidElement(child) ? React.cloneElement(child, mergeProps(restProps, child.props)) : child
  )
}
