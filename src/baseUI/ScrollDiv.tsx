import useScroll from 'hooks/useScroll'
import useToggle from 'hooks/useToggle'
import React, { ReactChild, useCallback, useEffect, useRef } from 'react'
import { cssVar } from 'style/cssFunctions'
import { CSSLength, toCssValue } from 'style/cssUnits'
import { setCSSVariable } from 'style/cssVaraiable'
import isExist from 'utils/judgers/isExist'
import notNullish from 'utils/judgers/notNullish'
import assert from 'utils/magic/assert'
import Div, { BaseUIDiv, DivProps } from './Div'
import { useElementMove } from './Transform/move.feature'
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
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const scrollbarThumbRef = useRef<HTMLDivElement>(null)

  const getScrollbarThumbInfo = (name: 'height' | 'top'): number => {
    const content = contentRef.current
    assert(notNullish(content))
    switch (name) {
      case 'top':
        return content.scrollTop * (content.clientHeight / content.scrollHeight)
      case 'height':
        return content.clientHeight * (content.clientHeight / content.scrollHeight)
    }
  }

  const setScollbarThumbCSSVariable = (key: 'height' | 'top', value: string | number): void => {
    const scrollbar = scrollbarRef.current
    assert(notNullish(scrollbar))
    if (!isScrollingByThumb) {
      setCSSVariable(scrollbar, `--scrollbar-${key}`, value)
    }
  }

  const attachScrollbarThumb = (name: 'height' | 'top') =>
    setScollbarThumbCSSVariable(name, getScrollbarThumbInfo(name))

  useScroll(contentRef, {
    disable: isScrollingByThumb,
    initListeners: true,
    onScroll: () => {
      attachScrollbarThumb('height')
      attachScrollbarThumb('top')
    }
  })

  // TODO: let thumb react user interaction
  const {css: moveFeatureCSS} = useElementMove(scrollbarThumbRef, {
    
  })

  return (
    <BaseUIDiv
      {...restProps}
      _className='ScrollDiv'
      _css={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Div
        domRef={scrollbarRef}
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
          css={[{
            position: 'absolute',
            top: cssVar('--scrollbar-top', '0', 'px'),
            left: '0',
            right: '0',
            height: cssVar('--scrollbar-height', '0', 'px'),
            background: cssDefaults.scrollbar.thumbColor
          }, moveFeatureCSS]}
        />
      </Div>
      <Div
        domRef={contentRef}
        className='my-scrollbar-content'
        css={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
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
