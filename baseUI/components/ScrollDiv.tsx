import useEventScroll from '../hooks/useEventScroll'
import useToggle from '../hooks/useToggle'
import React, { ReactChild, useRef } from 'react'
import { cssVar } from '../style/cssFunctions'
import { CSSLength } from '../style/cssUnits'
import { setCSSVariable } from '../style/cssVaraiable'
import Div, { BaseUIDiv, DivProps } from './Div'
import useFeatureMove from '../hooks/useFeatureMove'
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
 * @UIComponent a div with prettier scrollbar.
 */
export default function ScrollDiv({
  scrollbarWidth,
  children,
  ...restProps
}: ScrollDivProps): JSX.Element {
  const [
    isScrollingByThumb,
    { on: enableIsScrollingByThumb, off: disableIsScrollingByThumb }
  ] = useToggle(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const scrollbarThumbRef = useRef<HTMLDivElement>(null)

  // only use it in useEffect
  const getScrollbarThumbInfo = () => {
    const content = contentRef.current!
    return {
      top: content.scrollTop * (content.clientHeight / content.scrollHeight),
      height: content.clientHeight * (content.clientHeight / content.scrollHeight)
    }
  }

  // only use it in useEffect
  const setScollbarThumbCSSVariable = (
    keyValuePairs: [keyName: string, value: string | number][]
  ): void => {
    if (isScrollingByThumb) return
    for (const [key, value] of keyValuePairs) {
      setCSSVariable(scrollbarRef.current, `--scrollbar-${key}`, value)
    }
  }

  useEventScroll(contentRef, {
    disable: isScrollingByThumb,
    init: true,
    onScroll: () => {
      setScollbarThumbCSSVariable(Object.entries(getScrollbarThumbInfo()))
    }
  })

  const [isMoving] = useFeatureMove(scrollbarThumbRef, {
    direction: 'y',
    onMoveStart() {
      disableIsScrollingByThumb()
    },
    onMoveEnd() {
      enableIsScrollingByThumb()
    },
    onMove({ delta }) {
      const content = contentRef.current!
      const thumbScrollDeltaTop = delta.dy
      const contentScrollTop = thumbScrollDeltaTop * (content.scrollHeight / content.clientHeight)
      contentRef.current!.scrollBy({ top: contentScrollTop })
    }
    // TODO: mapFromResult({dx,dy}){}
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
          css={[
            {
              position: 'absolute',
              top: cssVar('--scrollbar-top', '0', 'px'),
              left: '0',
              right: '0',
              height: cssVar('--scrollbar-height', '0', 'px'),
              background: cssDefaults.scrollbar.thumbColor,
              transition: cssDefaults.transiton.immediately
            },
            {
              cursor: isMoving ? 'grabbing' : 'grab',
              touchAction: 'none', // 禁用掉浏览器对双指缩放的默认出处理
              userSelect: 'none', // 禁用掉文字的用户选择
              translate: [cssVar('--x', '0', 'px'), cssVar('--y', '0', 'px')]
            }
          ]}
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
