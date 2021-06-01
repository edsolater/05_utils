import React, { ReactChild } from 'react'
import { BaseUIDiv, DivProps } from './Div'

interface IScrollbarProps extends DivProps {
  children: ReactChild
}

/**
 * @UIComponent
 * this component will get a prettier scrollbar.
 */
export default function IScrollbar({ children }: IScrollbarProps) {
  return (
    <BaseUIDiv
      _className='i-scrollbar'
      _css={{
        display: 'contents',
        '> *': {
          color: 'yellow',
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }}
    >
      {children}
    </BaseUIDiv>
  )
}
