import { useHoverRef } from 'baseUI/hooks/useHover'
import React, { ReactNode } from 'react'
import Refs from './Refs'

interface HoverableProps {
  children?: ReactNode
}

/**
 * @WrapperComponent make it child hoverable (it's a hollowComponent)
 *
 * pass through `hover` prop
 */
export default function Hoverable({ children, ...restProps }: HoverableProps) {
  const [hoverRef, isHovered] = useHoverRef()
  return (
    <Refs {...restProps} hover={isHovered} exDomRef={hoverRef}>
      {children}
    </Refs>
  )
}
