import { UseHoverOptions, useHoverRef } from 'baseUI/hooks/useHover'
import React, { ReactNode } from 'react'
import Refs from './Refs'

interface HoverableProps extends UseHoverOptions {
  children?: ReactNode
}

/**
 * @WrapperComponent make it child hoverable (it's a hollowComponent)
 * pass through `hover` prop
 */
export default function Hoverable({
  children,
  onHover,
  onHoverStart,
  onHoverEnd,
  ...restProps
}: HoverableProps) {
  const [hoverRef, isHovered] = useHoverRef({ onHover, onHoverStart, onHoverEnd })
  return (
    <Refs {...restProps} hover={isHovered} exDomRef={hoverRef}>
      {children}
    </Refs>
  )
}
