import React, { isValidElement } from 'react'
import { isArray } from 'utils/functions/judgers'
import { DivProps } from './Div'
import { mergeProps } from 'baseUI/functions'

interface _PropsProps extends DivProps {
  [propName: string]: unknown
}

export default function _Props({ children, ...restProps }: _PropsProps) {
  children
  if (isArray(children)) {
    throw new Error(`<${_Props.name}> can't accept an array of child`)
  }
  if (!isValidElement(children)) {
    throw new Error(`the direct child of <${_Props.name}> is not ReactElement`)
  }
  return React.cloneElement(children, mergeProps(restProps, children.props))
}
