import { UseHoverOptions, useHoverRef } from 'baseUI/hooks/useHover'
import React, { ReactNode } from 'react'
import Ex from './Ex'

export interface HoverableProps extends UseHoverOptions {
  children?: ReactNode
}

export interface HoveableInjectProps {
  /**
   * 是否处于 hover 状态，由 <Hoverable> 传递
   * 一些交互组件，如 `<Button>` 应该天然 对 hover 做出反应
   */
   isHovered?: boolean
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
