import React, { isValidElement, ReactNode, RefObject } from 'react'

interface _DomRefProps {
  domRef?: RefObject<HTMLElement | null | unknown | undefined>
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
