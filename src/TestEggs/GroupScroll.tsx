import React, { Fragment, ReactNode, useMemo, useRef, useState } from 'react'
import Div, { BaseProps } from 'baseUI/Div'
import { splitToGroups } from 'utils/array/splitToGroups'
import { toPer } from 'style/cssUnits'
import { mix, cssMixins } from 'style/cssMixins'
import Scroll, { ScrollHandles } from 'baseUI/Scroll'
const cssGroup = () =>
  mix(cssMixins.solidFlexItem, {
    width: toPer(100),
    display: 'flex',
    justifyContent: 'space-around'
  })
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
  const ScrollRef = useRef<ScrollHandles>()

  const toLeft = () => ScrollRef.current?.toLeftPage()
  const toRight = () => ScrollRef.current?.toRightPage()
  return (
    <Div className='GroupScroll' _baseProps={baseProps}>
      {/* 滚动检测元素 */}
      <Scroll
        pageScroll
        componentRef={ScrollRef}
        onScrollIndexChange={setCurrentIndex}
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
