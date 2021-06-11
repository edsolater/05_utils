import { ReactNode } from 'react'
import { DivProps } from '../../../baseUI/components/Div'
import { IRef } from '../../../baseUI/components/Div/util/mergeRefs'

export interface ScrollState {
  clientWidth: number
  scrollWidth: number
  scrollLeft: number
}
export interface ScrollHandles {
  // 滚动，默认是相对滚动
  scroll: (dx: number | ((state: ScrollState) => number), mode?: 'by' | 'to') => void
}
export interface ScrollEvent {
  type: 'scrollstart' | 'scroll' | 'scrollend'
  path: HTMLElement[]
  target: HTMLDivElement
  clientWidth: number
  clientHeight: number
  scrollWidth: number
  scrollHeight: number
  /**滚动起始时 */
  scrollStartLeft: number
  scrollStartTop: number
  /**滚动结束时 */
  scrollLeft: number
  scrollTop: number
  /**在 X 方向上，距离上一次scrollEvent，滚动了多少？ */
  scrollX: number
  /**在 Y 方向上，距离上一次scrollEvent，滚动了多少？ */
  scrollY: number

  timestamp: number
  /**上次发出此事件的时间点，（如果是scrollstart，则为undefined） */
  prevTimestamp: number | undefined
  /**距离上次发出此事件的毫秒数，（如果是scrollstart，则为undefined） */
  deltaTime: number | undefined
}
export interface ScrollProps extends DivProps {
  componentRef?: IRef<ScrollHandles>
  children?: ReactNode
  /**
   * 隐藏scrollbar
   * TODO: 我觉得这应该在未来强制为true
   */
  hideScrollbar?: boolean
  onScroll?: (event: ScrollEvent) => void
  onScrollStart?: (event: ScrollEvent) => void
  onScrollEnd?: (event: ScrollEvent) => void
  /**
   * 只有非受控时有效
   */
  onScrollIndexChange?: (currentIndex: number, prevIndex?: number) => void
}
