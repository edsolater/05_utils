/**********************
 *
 * 目的：暴露与scroll相关的API
 * 需要能做到自定义滚动条、弹性滚动
 * 逻辑与样式相分离
 *
 **********************/
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import Div, { BaseProps } from 'baseUI/Div'
import { mix, cssMixins } from 'style/cssMixins'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
import useWatchValue from './useWatch'
import { IRef } from 'typings/reactType'
const cssOutter = (hideScrollbar?: boolean) =>
  mix(hideScrollbar && cssMixins.noScrollbar, {
    display: 'flex',
    scrollSnapType: 'x mandatory',
    overflow: 'auto'
  })
export interface ScrollHandles {
  toRightPage: () => void
  toLeftPage: () => void
}
interface OnScrollEvent {
  path: HTMLElement[]
  target: HTMLDivElement
  timestamp: Event['timeStamp']
}
interface ScrollProps extends BaseProps {
  componentRef?: IRef<ScrollHandles>
  /**
   * 隐藏scrollbar
   * TODO: 我觉得这应该在未来强制为true
   */
  hideScrollbar?: boolean
  currentPageIndex?: number
  onScroll?: (event: OnScrollEvent) => void
  onPageIndexChange?: (currentIndex: number, prevIndex: number) => void
}

/**每次滚动一组 */
const Scroll = ({
  componentRef,
  hideScrollbar = true,
  children,
  onScroll,
  currentPageIndex,
  onPageIndexChange,
  ...restProps
}: ScrollProps) => {
  const outterRef = useRef<HTMLDivElement>()
  const elementScrollLeft = () =>
    outterRef.current!.scrollBy({
      left: -1 * outterRef.current!.clientWidth,
      behavior: 'smooth'
    })
  const elementScrollRight = () =>
    outterRef.current!.scrollBy({ left: outterRef.current!.clientWidth, behavior: 'smooth' })

  const currentIndex = useRef(currentPageIndex ?? 0)

  useImperativeHandle(componentRef, () => ({
    toRightPage: elementScrollRight,
    toLeftPage: elementScrollLeft
  }))
  const attachScroll = (el: HTMLElement | undefined | null) => {
    el?.addEventListener(
      'scroll',
      (e) => {
        onScroll?.({
          path: ((e as unknown) as { path: [] }).path,
          target: e.target as HTMLDivElement,
          timestamp: e.timeStamp
        })
        // 滚动时更新 currentIndex
        const contentOrder = Math.round(el.scrollLeft / el.clientWidth)
        if (contentOrder !== currentIndex.current) {
          // currentPageIndex 触发时，onPageIndexChange应该始终输入1
          onPageIndexChange?.(contentOrder, currentIndex.current)
          currentIndex.current = contentOrder
        }
      },
      { passive: true }
    )
  }

  return (
    <>
      {/* 展示 TODO: 页面滚轮要能直接整屏滚动 */}
      {/* 滚动检测元素 */}
      <Div
        className='scroll-outter'
        domRef={mergeRefs(outterRef, attachScroll)}
        css={cssOutter(hideScrollbar)}
        _handoffProps={restProps}
      >
        {children}
      </Div>
    </>
  )
}
export default Scroll
