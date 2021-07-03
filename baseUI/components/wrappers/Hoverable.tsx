import { useToggle } from 'baseUI/hooks'
import useHover from 'baseUI/hooks/useHover'
import React, { ReactChild, useRef } from 'react'
import DomRef from './DomRef'

interface HoverableProps {
  children?: ReactChild | ((isHoverd: boolean) => ReactChild)
}

/**
 * @HollowComponent make it child hoverable (it's a hollowComponent)
 */
export default function Hoverable({ children, ...restProps }: HoverableProps) {
  const [isHovered, { on, off }] = useToggle(false)
  const ref = useRef<HTMLDivElement>(null)
  useHover(ref, {
    onHoverStart: on,
    onHoverEnd: off
  })
  return (
    <DomRef {...restProps} hover={isHovered} exDomRef={ref}>
      {children}
    </DomRef>
  )
}
