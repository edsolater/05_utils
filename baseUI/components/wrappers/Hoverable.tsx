import { UseHoverOptions, useHoverRef } from 'baseUI/hooks/useHover'
import React, { ReactNode } from 'react'
import Ex from './Ex'

interface HoverableProps extends UseHoverOptions {
  children?: ReactNode
}

/**
 * @WrapperComponent make it child hoverable (it's a hollowComponent)
 * pass through `isHovered` prop
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
    <Ex {...restProps} isHovered={isHovered} exDomRef={hoverRef}>
      {children}
    </Ex>
  )
}
