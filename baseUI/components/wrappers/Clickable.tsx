import { UseClickOptions, useClickRef } from 'baseUI/hooks/useClick'
import React, { ReactNode } from 'react'
import Ex from './Ex'

interface ClickableProps extends UseClickOptions {
  children?: ReactNode
}

/**
 * @WrapperComponent make it child clickable (it's a hollowComponent)
 *
 * pass through `hover` prop
 */
export default function Clickable({ children, onClick, ...restProps }: ClickableProps) {
  const [clickRef] = useClickRef({ onClick })
  return (
    <Ex {...restProps} exDomRef={clickRef}>
      {children}
    </Ex>
  )
}
