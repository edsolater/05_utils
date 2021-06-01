import React, { ReactChild } from 'react'
import { CSSLength } from 'style/cssUnits'
import Div, { BaseUIDiv, DivProps } from './Div'
import cssDefaults from './__config/cssDefaults'

interface ScrollDivProps extends DivProps {
  children: ReactChild
  /**
   * the width of thumb of scrollbar.
   * @default '8px'
   */
  scrollbarWidth?: CSSLength
}

/**
 * @UIComponent
 * this component will be a div and get a prettier scrollbar.
 */
export default function ScrollDiv({ scrollbarWidth, children, ...restProps }: ScrollDivProps) {
  return (
    <BaseUIDiv
      {...restProps}
      _className='ScrollDiv'
      _css={{
        position: 'relative'
      }}
    >
      <Div
        className='my-scrollbar'
        css={{
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          width: scrollbarWidth ?? '8px',
          zIndex:1
        }}
      >
        <Div
          className='my-scrollbar-thumb'
          css={{
            position: 'absolute',
            left: '0',
            right: '0',
            height: '100px', // TEMP
            background: cssDefaults.scrollbar.thumbColor
          }}
        />
      </Div>
      <Div
        className='my-scrollbar-article'
        css={{
          overflow: 'auto',
          position: 'absolute',
          inset: '0',
          '::-webkit-scrollbar': {
            width: '0'
          }
        }}
      >
        {children}
      </Div>
    </BaseUIDiv>
  )
}
