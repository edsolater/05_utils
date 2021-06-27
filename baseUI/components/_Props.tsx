import React, { isValidElement, ReactElement, ReactNode } from 'react'
import { isArray } from 'utils/functions/judgers'
import { DivProps } from './Div'
import { mergeProps } from 'baseUI/functions'

interface _PropsProps extends DivProps {
  [propName: string]: unknown
}

export default function _Props({ children, ...restProps }: _PropsProps) {
  _Props.checkChildren(children, _Props.name)
  return React.cloneElement(children, mergeProps(restProps, children.props))
}

_Props.checkChildren = function (
  children: ReactNode,
  componentName: string
): asserts children is ReactElement {
  if (isArray(children)) {
    throw new Error(`<${componentName}> can't accept an array of child`)
  }
  if (!isValidElement(children)) {
    throw new Error(`the direct child of <${componentName}> is not ReactElement`)
  }
}
