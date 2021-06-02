import useScroll from 'hooks/useScroll'
import useToggle from 'hooks/useToggle'
import React, { ReactChild, useEffect, useRef } from 'react'
import { cssVar } from 'style/cssFunctions'
import { CSSLength, toCssValue } from 'style/cssUnits'
import { setCSSVariable } from 'style/cssVaraiable'
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
  const [
    isScrollingByThumb,
    { on: setIsScrollingByThumb, off: setNotScrollingByThumb }
  ] = useToggle(false)
  const contentBoxRef = useRef<HTMLDivElement>(null)
  const scrollbarBoxRef = useRef<HTMLDivElement>(null)
  const scrollbarThumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentBoxRef.current!
    const scrollbar = scrollbarBoxRef.current!

    const scrollbarHeight = content.clientHeight * (content.clientHeight / content.scrollHeight)
    if (!isScrollingByThumb) setCSSVariable(scrollbar, '--scrollbar-height', scrollbarHeight)

    content.addEventListener('scroll', () => {
      const scrollbarHeight = content.clientHeight * (content.clientHeight / content.scrollHeight)
      if (!isScrollingByThumb) setCSSVariable(scrollbar, '--scrollbar-height', scrollbarHeight)

      const scrollbarTop = scrollbarHeight * (content.scrollTop / content.clientHeight)
      if (!isScrollingByThumb) setCSSVariable(scrollbar, '--scrollbar-top', scrollbarTop)
    })

    
  }, [])

  useScroll(contentBoxRef, {
    disable: isScrollingByThumb,
    
  })

  // useEffect(() => {
  //   const content = contentBoxRef.current!
  //   const scrollbar = scrollbarBoxRef.current!
  //   const scrollbarThumb = scrollbarThumbRef.current!

  //   content.addEventListener('scroll', () => {
  //     const scrollbarHeight = content.clientHeight * (content.clientHeight / content.scrollHeight)
  //     if (!isScrollingByThumb) setCSSVariable(scrollbar, '--scrollbar-height', scrollbarHeight)

  //     const scrollbarTop = scrollbarHeight * (content.scrollTop / content.clientHeight)
  //     if (!isScrollingByThumb) setCSSVariable(scrollbar, '--scrollbar-top', scrollbarTop)
  //   })
  // }, [])

  return (
    <BaseUIDiv
      {...restProps}
      _className='ScrollDiv'
      _css={{
        position: 'relative'
      }}
    >
      <Div
        domRef={scrollbarBoxRef}
        className='my-scrollbar'
        css={{
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          width: scrollbarWidth ?? '8px',
          zIndex: 1
        }}
      >
        <Div
          domRef={scrollbarThumbRef}
          className='my-scrollbar-thumb'
          css={{
            position: 'absolute',
            top: cssVar('--scrollbar-top', '0', 'px'),
            left: '0',
            right: '0',
            height: cssVar('--scrollbar-height', '0', 'px'),
            background: cssDefaults.scrollbar.thumbColor
          }}
        />
      </Div>
      <Div
        domRef={contentBoxRef}
        className='my-scrollbar-article'
        css={{
          overflow: 'auto',
          position: 'absolute',
          inset: '0',
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {children}
      </Div>
    </BaseUIDiv>
  )
}
