/**********************
 *
 * 目的：暴露与scroll相关的API
 * 需要能做到自定义滚动条、弹性滚动
 * 逻辑与样式相分离
 *
 **********************/
import React, { ReactNode, useImperativeHandle, useMemo, useRef } from 'react'
import Div, { BaseProps } from 'baseUI/Div'
import { mix, cssMixins } from 'style/cssMixins'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
import { IRef } from 'typings/reactType'
import useWatch from 'TestEggs/useWatch'
import notNullish from 'utils/judgers/notNullish'
import useRecordRef from 'TestEggs/useRecordedRef'
// TODO 有个flex，还是与业务太绑定了
const cssOutter = (cssinfo: { hideScrollbar?: boolean; scrollGrouply?: boolean } = {}) =>
  mix(
    cssinfo.hideScrollbar && cssMixins.noScrollbar,
    // cssinfo.scrollGrouply && {
    //   scrollSnapType: 'x mandatory',
    //   '> *': {
    //     scrollSnapAlign: 'start'
    //   }
    // },
    {
      display: 'flex',
      overflow: 'auto'
    }
  )
export interface ScrollHandles {
  toRightPage: () => void
  toLeftPage: () => void
  toScrollPage: (offset: number) => void
}
export interface OnScrollEvent {
  path: HTMLElement[]
  target: HTMLDivElement
  timestamp: Event['timeStamp']
  /** 当前滚动到第几页 */
  currentScrollIndex: number
  prevScrollIndex: undefined | number
  /**在 X 方向上，距离上一次scrollEvent，滚动了多少？ */
  scrollX: number
  /**在 Y 方向上，距离上一次scrollEvent，滚动了多少？ */
  scrollY: number
}
export interface ScrollProps extends BaseProps {
  componentRef?: IRef<ScrollHandles>
  children?: ReactNode
  /**
   * 隐藏scrollbar
   * TODO: 我觉得这应该在未来强制为true
   */
  hideScrollbar?: boolean
  /** TODO 还没做 是否一次滚动一屏（轮播器效果） */
  pageScroll?: boolean
  /**
   * 设定是受控，不设定是非受控
   */
  scrollIndex?: number
  onScroll?: (event: OnScrollEvent) => void
  onScrollStart?: (event: OnScrollEvent) => void
  onScrollEnd?: (event: OnScrollEvent) => void
  /**
   * 只有非受控时有效
   */
  onScrollIndexChange?: (currentIndex: number, prevIndex?: number) => void
}
/**元素滚动 */
const scrollElement = (el: HTMLElement, options: { offset: number }) => {
  el.scrollBy({
    left: options.offset * el.clientWidth,
    behavior: 'smooth'
  })
}
/**每次滚动一组 */
const Scroll = ({
  componentRef,
  children,
  pageScroll,
  hideScrollbar = true,
  onScroll,
  onScrollStart,
  onScrollEnd,
  scrollIndex: incomeScrollIndex,
  onScrollIndexChange,
  ...baseProps
}: ScrollProps) => {
  const outterRef = useRef<HTMLDivElement>()
  const scrollIndex = useRecordRef(incomeScrollIndex ?? 0)
  const isControlledComponent = useMemo(() => notNullish(incomeScrollIndex), [incomeScrollIndex])
  useImperativeHandle(
    componentRef,
    () =>
      ({
        toLeftPage: () => scrollElement(outterRef.current!, { offset: -1 }),
        toRightPage: () => scrollElement(outterRef.current!, { offset: 1 }),
        toScrollPage: (offset: number) => scrollElement(outterRef.current!, { offset })
      } as ScrollHandles)
  )
  useWatch((val) => {
    if (isControlledComponent) {
      scrollElement(outterRef.current!, { offset: val - scrollIndex.current })
      scrollIndex.current = val
    }
  }, incomeScrollIndex)
  // IDEA：这些特定于事件的recordRef，可以包装成useScrollEvent的hook
  const scrollTimestamp = useRecordRef<number>()
  const scrollTop = useRecordRef(0) // 没有与incomeScrollIndex联系起来，不太好
  const scrollLeft = useRecordRef(0) // 没有与incomeScrollIndex联系起来，不太好
  const scrollTimeoutId = useRecordRef(0)
  const attachScroll = (el: HTMLElement | undefined | null) => {
    el?.addEventListener(
      'scroll',
      (e) => {
        const scrollX = el.scrollLeft - scrollLeft.current
        const scrollY = el.scrollTop - scrollTop.current
        const scrollEvent = {
          path: ((e as unknown) as { path: [] }).path,
          target: e.target as HTMLDivElement,
          timestamp: e.timeStamp,
          currentScrollIndex: scrollIndex.current,
          prevScrollIndex: scrollIndex.prev,
          scrollX,
          scrollY
        }
        onScroll?.(scrollEvent)
        scrollLeft.current = el.scrollLeft
        scrollTop.current = el.scrollTop
        scrollTimestamp.current = e.timeStamp
        // const deltaTime = scrollTimestamp.prev
        //   ? scrollTimestamp.current - scrollTimestamp.prev
        //   : Infinity
        // const isStartScroll = deltaTime === Infinity
        // if (isStartScroll) {
        //   onScrollStart?.(scrollEvent)
        //   scrollTimeoutId.current = window.setTimeout(, 100) //如果100毫秒没发出scroll事件，就视为scrollEnd（且手指不在屏幕上）
        // }
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
        css={cssOutter({ hideScrollbar, scrollGrouply: pageScroll })}
        _baseProps={baseProps}
      >
        {children}
      </Div>
    </>
  )
}
export default Scroll
