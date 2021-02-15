/**********************
 *
 * 目的：暴露与scroll相关的API
 * 需要能做到自定义滚动条、弹性滚动
 * 逻辑与样式相分离
 *
 **********************/
import React, { useImperativeHandle, useMemo, useRef } from 'react'
import Div, { BaseProps } from 'baseUI/Div'
import { mix, cssMixins } from 'style/cssMixins'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
import { IRef } from 'typings/reactType'
import useWatch from 'TestEggs/useWatch'
import notNullish from 'utils/judgers/notNullish'
import useRecordedRef from 'TestEggs/useRecordedRef'
// TODO 有个flex，还是与业务太绑定了
const cssOutter = (hideScrollbar?: boolean) =>
  mix(hideScrollbar && cssMixins.noScrollbar, {
    display: 'flex',
    scrollSnapType: 'x mandatory',
    '> *': {
      scrollSnapAlign: 'start'
    },
    overflow: 'auto',
  })
export interface ScrollHandles {
  toRightPage: () => void
  toLeftPage: () => void
  toScrollPage: (offset: number) => void
}
export interface OnScrollEvent {
  path: HTMLElement[]
  target: HTMLDivElement
  timestamp: Event['timeStamp']
  currentScrollIndex: number
  prevScrollIndex: undefined | number
}
export interface ScrollProps extends BaseProps {
  componentRef?: IRef<ScrollHandles>
  /**
   * 隐藏scrollbar
   * TODO: 我觉得这应该在未来强制为true
   */
  hideScrollbar?: boolean
  /** TODO 还没做 是否一次滚动一屏（轮播器效果） */
  hasGroup?:boolean
  /**
   * 设定是受控，不设定是非受控
   */
  scrollIndex?: number
  onScroll?: (event: OnScrollEvent) => void
  /**
   * 只有非受控时有效
   */
  onScrollIndexChange?: (currentIndex: number, prevIndex: number) => void
}

/**每次滚动一组 */
const Scroll = ({
  componentRef,
  hideScrollbar = true,
  children,
  onScroll,
  scrollIndex: incomeScrollIndex,
  onScrollIndexChange,
  ...restProps
}: ScrollProps) => {
  const outterRef = useRef<HTMLDivElement>()
  const scrollIndex = useRecordedRef(incomeScrollIndex ?? 0)
  const isControlledComponent = useMemo(() => notNullish(incomeScrollIndex), [incomeScrollIndex])
  const elementScroll = (offset: number) => {
    outterRef.current!.scrollBy({
      left: offset * outterRef.current!.clientWidth,
      behavior: 'smooth'
    })
  }
  useImperativeHandle(
    componentRef,
    () =>
      ({
        toLeftPage: () => elementScroll(-1),
        toRightPage: () => elementScroll(1),
        toScrollPage: elementScroll
      } as ScrollHandles)
  )
  useWatch((val) => {
    if (isControlledComponent) {
      elementScroll(val - scrollIndex.current)
      scrollIndex.current = val
    }
  }, incomeScrollIndex)
  const attachScroll = (el: HTMLElement | undefined | null) => {
    el?.addEventListener(
      'scroll',
      (e) => {
        onScroll?.({
          path: ((e as unknown) as { path: [] }).path,
          target: e.target as HTMLDivElement,
          timestamp: e.timeStamp,
          currentScrollIndex: scrollIndex.current,
          prevScrollIndex: scrollIndex.prev
        })
        // 滚动时更新 currentIndex
        const contentOrder = Math.round(el.scrollLeft / el.clientWidth)
        const needToRecord = scrollIndex.current !== contentOrder
        if (needToRecord) scrollIndex.current = contentOrder
        if (!isControlledComponent) onScrollIndexChange?.(scrollIndex.current, scrollIndex.prev)
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
        _baseProps={restProps}
      >
        {children}
      </Div>
    </>
  )
}
export default Scroll
