import { mergeProps } from 'baseUI/functions'
import React, { isValidElement, RefObject } from 'react'
import { MayArray } from 'typings/tools'
import { isArray } from 'utils/functions/judgers'
import { DivProps } from './Div'

interface _DomRefProps extends DivProps {
  _domRef?: MayArray<RefObject<HTMLElement | null | undefined>>
}

export default function _DomRef({ _domRef, children, ...restProps }: _DomRefProps) {
  if (isArray(children)) {
    throw new Error(`<${_DomRef.name}> can't accept an array of child`)
  }
  if (!isValidElement(children)) {
    throw new Error(`the direct child of <${_DomRef.name}> is not ReactElement`)
  }
  return React.cloneElement(children, mergeProps(restProps, children.props, { domRef: _domRef }))
}
