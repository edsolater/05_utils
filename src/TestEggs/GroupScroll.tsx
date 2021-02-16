import React, { Fragment, ReactNode, useRef, useState } from 'react'
import Div, { BaseProps } from 'baseUI/Div'
import { mix, cssMixins } from 'style/cssMixins'
import Scroll from 'baseUI/Scroll'
import { ScrollHandles, ScrollEvent } from 'baseUI/Scroll/_interface'
interface GroupScrollProps<T> extends BaseProps {
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
  renderItem,
  ...baseProps
}: GroupScrollProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<ScrollHandles>()

  const toLeft = () => scrollRef.current?.scrollTo((info) => -info.clientWidth)
  const toRight = () => scrollRef.current?.scrollTo((info) => info.clientWidth)
  const handleScroll = (e: ScrollEvent) => {
    const contentOrder = Math.round(e.scrollLeft / e.scrollWidth)
    if (contentOrder !== currentIndex) setCurrentIndex(contentOrder)
  }
  return (
    <Div className='GroupScroll' _baseProps={baseProps}>
      {/* 滚动检测元素 */}
      <Scroll componentRef={scrollRef} onScrollEnd={toRight} onScroll={handleScroll} css={{ gap: 8 }}>
        {items.map((item, idx) => (
          <Fragment key={(item as any)?.key ?? (item as any)?.id ?? idx}>
            {renderItem(item, idx)}
          </Fragment>
        ))}
      </Scroll>

      {/* 控制按钮（上一页/下一页） */}
      <Div
        className='GroupScroll-controller'
        css={mix(cssMixins.horizontalLayout, { fontSize: '3em' })}
      >
        <Div
          className='GroupScroll-controller__left-arrow'
          onClick={toLeft}
          css={mix(cssMixins.buttonStyle)}
        >
          {'◀'}
        </Div>
        {currentIndex}
        <Div
          className='GroupScroll-controller__right-arrow'
          onClick={toRight}
          css={mix(cssMixins.buttonStyle)}
        >
          {'▶'}
        </Div>
      </Div>
    </Div>
  )
}
export default GroupScroll
