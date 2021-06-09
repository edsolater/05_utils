import React, { ReactChild, useRef } from 'react'
import useToggle from '../hooks/useToggle'
import { BaseUIDiv } from './Div'
import { shrinkToValue } from 'utils/functions/magic/shrinkToValue'
import { useFeatureHover } from 'baseUI/hooks/useFeatureHover'

interface HoverableProps {
  /** it will add filter:brightness(0.6) for it's direct child
   * this props can disable the action
   * @default true
   */
  cssEffect?: boolean
  children?: ReactChild | ((isHoverd: boolean) => ReactChild)
}

/**
 * @HollowComponent make it child hoverable (it's a hollowComponent)
 */
export default function Hoverable({ cssEffect = true, children }: HoverableProps) {
  const [isHovered, { on, off }] = useToggle(false)
  const ref = useRef<HTMLDivElement>(null)
  useFeatureHover(ref, {
    onHover({ state }) {
      if (state === 'start') on()
      if (state === 'end') off()
    }
  })
  return (
    <BaseUIDiv
      _domRef={ref}
      _className='Hoverable'
      _css={[
        { display: 'contents' },
        cssEffect && {
          '> *:hover': {
            filter: 'brightness(0.6)'
          }
        }
      ]}
    >
      {shrinkToValue(children, [isHovered])}
    </BaseUIDiv>
  )
}
