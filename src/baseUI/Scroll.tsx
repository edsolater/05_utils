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
import { isUndefined } from 'lodash'
import timeout from './timeout'
import { ID } from 'typings/constants'
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
export interface IScrollEvent {
  type: 'scrollstart' | 'scroll' | 'scrollend'
  path: HTMLElement[]
  target: HTMLDivElement
  timestamp: Event['timeStamp']
  /** 当前滚动到第几页 */
  currentScrollIndex: number
  prevScrollIndex: undefined | number
  /**滚动起始时 */
  scrollStartLeft: number
  scrollStartTop: number
  /**滚动结束时 */
  scrollEndLeft: number
  scrollEndTop: number
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
  onScroll?: (event: IScrollEvent) => void
  onScrollStart?: (event: IScrollEvent) => void
  onScrollEnd?: (event: IScrollEvent) => void
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
  const actionId = useRecordRef<ID>(0)
  const attachScroll = (el: HTMLElement | undefined | null) => {
    el?.addEventListener(
      'scroll',
      (e) => {
        scrollLeft.current = el.scrollLeft
        scrollTop.current = el.scrollTop
        scrollTimestamp.current = e.timeStamp
        const scrollEvent = {
          path: ((e as unknown) as { path: [] }).path,
          target: e.target as HTMLDivElement,
          timestamp: e.timeStamp,
          currentScrollIndex: scrollIndex.current,
          prevScrollIndex: scrollIndex.prev,
          scrollStartLeft: scrollLeft.prev,
          scrollStartTop: scrollLeft.prev,
          scrollEndLeft: scrollLeft.current,
          scrollEndTop: scrollLeft.current,
          scrollX: scrollLeft.current - scrollLeft.prev,
          scrollY: scrollTop.current - scrollTop.prev
        }

        // 开始滚动
        const deltaTime = scrollTimestamp.prev
          ? scrollTimestamp.current - scrollTimestamp.prev
          : undefined
        const isStartScroll = isUndefined(deltaTime)
        if (isStartScroll) onScrollStart?.({ ...scrollEvent, type: 'scrollstart' })

        //结束滚动
        const timeoutController = timeout(
          () => {
            const direction = 'LEFT' //TEMP
            onScrollEnd?.({ ...scrollEvent, type: 'scrollend' })
            scrollTimestamp.restart()
          },
          100,
          { actionId: actionId.current }
        ) //如果100毫秒没发出scroll事件，就视为scrollEnd（且手指不在屏幕上）
        actionId.current = timeoutController.actionId

        // 滚动中
        onScroll?.({ ...scrollEvent, type: 'scroll' })

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
        className='Scroll'
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
