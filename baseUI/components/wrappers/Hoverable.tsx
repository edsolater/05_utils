import { useToggle, useFeatureHover } from 'baseUI/hooks'
import React, { ReactChild, useRef } from 'react'
import { shrinkToValue } from 'utils/functions/magic'
import { BaseUIDiv } from '..'

interface HoverableProps {
  children?: ReactChild | ((isHoverd: boolean) => ReactChild)
}

/**
 * @HollowComponent make it child hoverable (it's a hollowComponent)
 */
export default function Hoverable({ children }: HoverableProps) {
  const [isHovered, { on, off }] = useToggle(false)
  const ref = useRef<HTMLDivElement>(null)
  useFeatureHover(ref, {
    onHover({ now: state }) {
      if (state === 'start') on()
      if (state === 'end') off()
    }
  })
  return (
    <BaseUIDiv _domRef={ref} _className='Hoverable' _css={{ display: 'contents' }}>
      {shrinkToValue(children, [isHovered])}
    </BaseUIDiv>
  )
}
