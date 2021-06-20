import React, { isValidElement, ReactNode, RefObject } from 'react'
import { MayArray } from 'typings/tools'

interface _DomRefProps {
  domRef?: MayArray<RefObject<HTMLElement | null | undefined>>
  children?: ReactNode
}

export default function _DomRef(props: _DomRefProps) {
  const child = props.children
  if (!isValidElement(child)) {
    throw new Error('the direct child is not ReactElement')
  }
  // @ts-ignore
  return React.cloneElement(child, { domRef: [child['domRef'], props.domRef].flat() })
}
