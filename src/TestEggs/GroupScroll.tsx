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
  ...restProps
}: GroupScrollProps<T>) => {
  const groupedItems = useMemo(() => splitToGroups(items, groupCapacity), [items, groupCapacity])
  const [currentIndex, setCurrentIndex] = useState(0)
  const ScrollRef = useRef<ScrollHandles>()

  const toLeft = () => ScrollRef.current?.toLeftPage()
  const toRight = () => ScrollRef.current?.toRightPage()
  return (
    <Div className='GroupScroll' _baseProps={restProps}>
      {/* 滚动检测元素 */}
      {/* TODO：是否需要整屏滚动应该是传入个props就好了的 */}
      {/* <Scroll scrollGrouply componentRef={ScrollRef} onScrollIndexChange={setCurrentIndex}>
        {groupedItems.map((group, groupIndex) => (
          <Div className='GroupScroll__group' css={cssGroup()} key={groupIndex}>
            {group.map((item, idx) => (
              <Fragment key={(item as any)?.key ?? (item as any)?.id ?? idx}>
                {renderItem(item, idx)}
              </Fragment>
            ))}
          </Div>
        ))}
      </Scroll> */}
      <Scroll scrollGrouply componentRef={ScrollRef} onScrollIndexChange={setCurrentIndex}>
        {items.map((item, idx) => (
          <Fragment key={(item as any)?.key ?? (item as any)?.id ?? idx}>
            {renderItem(item, idx)}
          </Fragment>
        ))}
      </Scroll>

      {/* 控制按钮（上一页/下一页） */}
      <Div
        className='GroupScroll__controller'
        css={mix(cssMixins.horizontalLayout, { fontSize: '3em' })}
      >
        <Div
          className='GroupScroll__controller-left-arrow'
          onClick={toLeft}
          css={mix(cssMixins.buttonStyle)}
        >
          {'◀'}
        </Div>
        {currentIndex}
        <Div
          className='GroupScroll__controller-right-arrow'
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
