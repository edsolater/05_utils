import { mergeProps } from 'baseUI/functions'
import React, { RefObject } from 'react'
import { MayArray } from 'typings/tools'
import { DivProps } from './Div'
import _Props from './_Props'

interface _DomRefProps extends DivProps {
  _domRef?: MayArray<RefObject<HTMLElement | null | undefined>>
}

export default function _DomRef({ _domRef, children, ...restProps }: _DomRefProps) {
  _Props.checkChildren(children, _DomRef.name)
  return <_Props {...mergeProps(restProps, { domRef: _domRef })}>{children}</_Props>
}
