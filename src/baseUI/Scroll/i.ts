import { ReactNode } from 'react';
import { BaseProps } from 'baseUI/Div';
import { IRef } from 'typings/reactType';

export interface ScrollState {
  clientWidth: number;
  scrollWidth: number;
  scrollLeft: number;
}
export interface ScrollHandles {
  scrollTo: (dx: number | ((state: ScrollState) => number)) => void;
}
export interface ScrollEvent {
  type: 'scrollstart' | 'scroll' | 'scrollend';
  path: HTMLElement[];
  target: HTMLDivElement;
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  /**滚动起始时 */
  scrollStartLeft: number;
  scrollStartTop: number;
  /**滚动结束时 */
  scrollLeft: number;
  scrollTop: number;
  /**在 X 方向上，距离上一次scrollEvent，滚动了多少？ */
  scrollX: number;
  /**在 Y 方向上，距离上一次scrollEvent，滚动了多少？ */
  scrollY: number;

  timestamp: number;
  /**上次发出此事件的时间点，（如果是scrollstart，则为undefined） */
  prevTimestamp: number | undefined;
  /**距离上次发出此事件的毫秒数，（如果是scrollstart，则为undefined） */
  deltaTime: number | undefined;
}
export interface ScrollProps extends BaseProps {
  componentRef?: IRef<ScrollHandles>;
  children?: ReactNode;
  /**
   * 隐藏scrollbar
   * TODO: 我觉得这应该在未来强制为true
   */
  hideScrollbar?: boolean;
  /** TODO 还没做 是否一次滚动一屏（轮播器效果） */
  pageScroll?: boolean;
  /**
   * 设定是受控，不设定是非受控
   */
  scrollIndex?: number;
  onScroll?: (event: ScrollEvent) => void;
  onScrollStart?: (event: ScrollEvent) => void;
  onScrollEnd?: (event: ScrollEvent) => void;
  /**
   * 只有非受控时有效
   */
  onScrollIndexChange?: (currentIndex: number, prevIndex?: number) => void;
}
