import React, { Fragment, ReactNode, useRef, useState } from 'react'
import Div, { DivProps } from 'baseUI/components/Div'
import { mixCSSObjects } from 'baseUI/style/cssParser'
import { cssMixins } from "baseUI/style/cssMixins"
import Scroll from 'baseUI/components/Scroll'
import { ScrollHandles, ScrollEvent } from 'baseUI/components/Scroll/_interface'
interface GroupScrollProps<T> extends DivProps {
  /**隐藏scrollbar */
  hideScrollbar?: boolean
  items: ReadonlyArray<T>
  /**单个grop中的item数量 */
  groupCapacity: number
  renderItem: (item: T, itemIndex: number) => ReactNode
}

/**每次滚动一组 */
const GroupScroll = <T extends any>({
  hideScrollbar,
  items,
  groupCapacity,
  renderItem
}: GroupScrollProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<ScrollHandles>()

  const toLeft = () => scrollRef.current?.scroll((info) => -info.clientWidth)
  const toRight = () => scrollRef.current?.scroll((info) => info.clientWidth)
  const handleScroll = (e: ScrollEvent) => {
    const contentOrder = Math.round(e.scrollLeft / e.scrollWidth)
    if (contentOrder !== currentIndex) setCurrentIndex(contentOrder)
  }
  return (
    <Div className='GroupScroll'>
      {/* 滚动检测元素 */}
      <Scroll
        componentRef={scrollRef}
        onScrollEnd={(event) => console.log(event)}
        onScroll={handleScroll}
        css={{ gap: 8 }}
      >
        {items.map((item, idx) => (
          <Fragment key={(item as any)?.key ?? (item as any)?.id ?? idx}>
            {renderItem(item, idx)}
          </Fragment>
        ))}
      </Scroll>

      {/* 控制按钮（上一页/下一页） */}
      <Div
        className='GroupScroll-controller'
        css={mixCSSObjects(cssMixins.horizontalLayout, { fontSize: '3em' })}
      >
        <Div
          className='GroupScroll-controller__left-arrow'
          onClick={toLeft}
          css={mixCSSObjects(cssMixins.buttonStyle)}
        >
          {'◀'}
        </Div>
        {currentIndex}
        <Div
          className='GroupScroll-controller__right-arrow'
          onClick={toRight}
          css={mixCSSObjects(cssMixins.buttonStyle)}
        >
          {'▶'}
        </Div>
      </Div>
    </Div>
  )
}
export default GroupScroll
