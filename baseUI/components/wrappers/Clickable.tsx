import { UseClickOptions, useClickRef } from 'baseUI/hooks/useClick'
import React, { ReactNode } from 'react'
import Ex from './Ex'

interface ClickableProps extends UseClickOptions {
  children?: ReactNode
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
