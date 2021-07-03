import { UseHoverOptions, useHoverRef } from 'baseUI/hooks/useHover'
import React, { ReactNode } from 'react'
import Props from './Props'
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
    <Props hover={isHovered}>
      <Refs {...restProps} exDomRef={hoverRef}>
        {children}
      </Refs>
    </Props>
  )
}
