import React, { ReactChild, useRef, useEffect } from 'react'
import { useToggle_Ref } from 'baseUI/hooks/useToggle'
import { CSSLength, toPx } from 'baseUI/style'
import Div, { DivProps } from './Div'
import { BaseUIDiv } from '.'
import { cssDefaultTransition, cssDefaultUI } from 'baseUI/settings/cssDefaults'

interface ScrollDivProps extends DivProps {
  children: ReactChild
  /**
   * the width of thumb of scrollbar.
   * @default '8px'
   */
  scrollbarWidth?: CSSLength
  /**@default 'y' */
  scrollAxis?: 'x' | 'y' | 'both'
}

/**
 * @UIComponent a div with prettier scrollbar.
 */
export default function ScrollDiv({
  scrollbarWidth = '8px',
  scrollAxis = 'y',
  children,
  ...restProps
}: ScrollDivProps): JSX.Element {
  const [
    isScrollByContent,
    { on: enableScrollByContent, off: disableScrollByContent }
  ] = useToggle_Ref()
  const [
    isScrollByScrollbar,
    { on: enableScrollByScrollbar, off: disableScrollByScrollbar }
  ] = useToggle_Ref()
  const outerBoxRef = useRef<HTMLDivElement>(null)
  const contentBoxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollbarBoxRef = useRef<HTMLDivElement>(null)
  const scrollbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    contentBoxRef.current!.addEventListener('pointerover', enableScrollByContent)
    scrollbarBoxRef.current!.addEventListener('pointerover', enableScrollByScrollbar)
    contentBoxRef.current!.addEventListener('pointerout', disableScrollByContent)
    scrollbarBoxRef.current!.addEventListener('pointerout', disableScrollByScrollbar)
    return () => {
      contentBoxRef.current!.removeEventListener('pointerover', enableScrollByContent)
      scrollbarBoxRef.current!.removeEventListener('pointerover', enableScrollByScrollbar)
      contentBoxRef.current!.removeEventListener('pointerout', disableScrollByContent)
      scrollbarBoxRef.current!.removeEventListener('pointerout', disableScrollByScrollbar)
    }
  }, [])

  useEffect(() => {
    scrollbarRef.current!.style.height = toPx(contentRef.current!.scrollHeight)
    const contentScrollHandler = ({ target }: Event): void => {
      if (isScrollByScrollbar()) return
      const scrollTop = (target as HTMLElement).scrollTop
      scrollbarBoxRef.current!.scrollTo({ top: scrollTop })
    }
    const scrollbarScrollHandler = ({ target }: Event): void => {
      if (isScrollByContent()) return
      const scrollTop = (target as HTMLElement).scrollTop
      contentBoxRef.current!.scrollTo({ top: scrollTop })
    }
    contentBoxRef.current!.addEventListener('scroll', contentScrollHandler)
    scrollbarBoxRef.current!.addEventListener('scroll', scrollbarScrollHandler)
    return () => {
      contentBoxRef.current!.removeEventListener('scroll', contentScrollHandler)
      scrollbarBoxRef.current!.removeEventListener('scroll', scrollbarScrollHandler)
    }
  }, [])
  return (
    <BaseUIDiv
      _domRef={outerBoxRef}
      {...restProps}
      _className='ScrollDiv'
      _css={{
        position: 'relative',
        overflow: 'auto',
        '::-webkit-scrollbar': {
          display: 'none'
        },
        ':hover': {
          '.ScrollDiv-scrollbar-box': {
            // 如果靠组件状态处理的话， 性能堪忧
            opacity: '1'
          }
        },
        '.ScrollDiv-scrollbar-box': {
          // 如果靠组件状态处理的话， 性能堪忧
          opacity: '0.4',
          transition: cssDefaultTransition.normal
        }
      }}
    >
      <Div
        domRef={contentBoxRef}
        className='ScrollDiv-content-box'
        css={{
          height: '100%',
          overflow: 'auto',
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        <Div className='ScrollDiv-content' domRef={contentRef}>
          {children}
        </Div>
      </Div>
      <Div
        domRef={scrollbarBoxRef}
        className='ScrollDiv-scrollbar-box'
        css={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: scrollbarWidth,
          overflow:
            scrollAxis === 'x'
              ? 'auto hidden'
              : scrollAxis === 'y'
              ? 'hidden auto'
              : scrollAxis === 'both'
              ? 'auto'
              : '',
          resize: 'none',
          '::-webkit-scrollbar': {
            width: scrollbarWidth,
            background: 'transparent'
          },
          '::-webkit-scrollbar-thumb': {
            width: scrollbarWidth,
            borderRadius: scrollbarWidth,
            background: cssDefaultUI.ScrollDiv.thumbColor,
            ':hover': {
              background: cssDefaultUI.ScrollDiv.thumbColorHover
            },
            ':active': {
              background: cssDefaultUI.ScrollDiv.thumbColorActive
            }
          }
        }}
      >
        <Div
          domRef={scrollbarRef}
          className='ScrollDiv-scrollbar-thumb'
          css={{ width: '1px', pointerEvents: 'none' }}
        ></Div>
      </Div>
    </BaseUIDiv>
  )
}
