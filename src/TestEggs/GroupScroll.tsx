import React, { Fragment, ReactNode, useMemo, useRef, useState } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { splitToGroups } from 'utils/array/splitToGroups'
import { toPer } from 'style/cssUnits'
import { mix, cssMixins } from 'style/cssMixins'
import Scroll, { ScrollHandles } from './Scroll'
const cssGroup = () =>
  mix(cssMixins.solidFlexItem, {
    display: 'flex',
    scrollSnapAlign: 'start',
    width: toPer(100),
    justifyContent: 'space-around'
  })
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
  renderItem,
  ...restProps
}: GroupScrollProps<T>) => {
  const groupedItems = useMemo(() => splitToGroups(items, groupCapacity), [items, groupCapacity])
  const [currentIndex, setCurrentIndex] = useState(0)
  const ScrollRef = useRef<ScrollHandles>()

  const toLeft = () => ScrollRef.current?.toLeftPage()
  const toRight = () => ScrollRef.current?.toRightPage()

  return (
    <Div className='GroupScroll' _handoffProps={restProps}>
      {/* 展示 TODO: 页面滚轮要能直接整屏滚动 */}
      {/* 滚动检测元素 */}
      <Scroll
        componentRef={ScrollRef}
        onPageIndexChange={setCurrentIndex}
      >
        {groupedItems.map((group, groupIndex) => (
          <Div className='group-scroll-group' css={cssGroup()} key={groupIndex}>
            {group.map((item, idx) => (
              <Fragment key={(item as any).key ?? (item as any).id ?? idx}>
                {renderItem(item, idx)}
              </Fragment>
            ))}
          </Div>
        ))}
      </Scroll>

      {/* 控制按钮（上一页/下一页） */}
      <Div
        className='group-scroll-controller'
        css={mix(cssMixins.horizontalLayout, { fontSize: '3em' })}
      >
        <Div
          className='group-scroll-controller-left-arrow'
          onClick={toLeft}
          css={mix(cssMixins.buttonStyle)}
        >
          {'◀'}
        </Div>
        {currentIndex}
        <Div
          className='group-scroll-controller-right-arrow'
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
