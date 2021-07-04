import { UseClickOptions, useClickRef } from 'baseUI/hooks/useClick'
import React, { ReactNode } from 'react'
import Ex from './Ex'

export interface ClickableProps extends UseClickOptions {
  children?: ReactNode
}

export interface ClickableInjectProps {
  /**
   * 是否处于 active 状态，由 <Clickable> 传递
   * 一些交互组件，如 `<Button>` 应该天然 对 active 做出反应
   */
  isActive?: boolean
}

/**
 * @WrapperComponent make it child clickable (it's a hollowComponent)
 *
 * pass through `isActive` prop
 */
export default function Clickable({
  children,
  onClick,
  onActiveStart,
  onActiveEnd,
  ...restProps
}: ClickableProps) {
  const [clickRef, isActive] = useClickRef({ onClick, onActiveStart, onActiveEnd })
  return (
    <Ex {...restProps} isActive={isActive} exDomRef={clickRef}>
      {children}
    </Ex>
  )
}
