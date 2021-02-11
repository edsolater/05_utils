import React, { Fragment, ReactNode, useMemo, useRef, useState } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { splitToGroups } from 'utils/array/splitToGroups'
import { toPer } from 'style/cssUnits'
import { mix, cssMixins } from 'style/cssMixins'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
const cssOutter = (hideScrollbar?: boolean) =>
  mix(hideScrollbar && cssMixins.noScrollbar, {
    display: 'flex',
    scrollSnapType: 'x mandatory',
    overflow: 'auto'
  })
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
  const outterRef = useRef<HTMLDivElement>()
  const groupedItems = useMemo(() => splitToGroups(items, groupCapacity), [items, groupCapacity])
  const [currentIndex, setCurrentIndex] = useState(0)
  const elementScrollLeft = () =>
    outterRef.current!.scrollBy({ left: -1 * outterRef.current!.clientWidth, behavior: 'smooth' })
  const elementScrollRight = () =>
    outterRef.current!.scrollBy({ left: outterRef.current!.clientWidth, behavior: 'smooth' })

  const attachGroupScroll = (el: HTMLElement | undefined | null) => {
    el?.addEventListener(
      'scroll',
      () => {
        // 滚动时更新 currentIndex
        const contentOrder = Math.round(el.scrollLeft / el.clientWidth)
        if (contentOrder !== currentIndex) setCurrentIndex(contentOrder)
      },
      { passive: true }
    )
  }

  return (
    <>
      {/* 展示 TODO: 页面滚轮要能直接整屏滚动 */}
      {/* 滚动检测元素 */}
      <Div
        className='group-scroll-outter'
        domRef={mergeRefs(outterRef, attachGroupScroll)}
        css={cssOutter(hideScrollbar)}
        handoffProps={restProps}
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
      </Div>

      {/* 控制按钮（上一页/下一页） */}
      <Div
        className='group-scroll-controller'
        css={mix(cssMixins.horizontalLayout, { fontSize: '3em' })}
      >
        <Div
          className='group-scroll-controller-left-arrow'
          onClick={elementScrollLeft}
          css={mix(cssMixins.buttonStyle)}
        >
          {'◀'}
        </Div>
        {currentIndex}
        <Div
          className='group-scroll-controller-right-arrow'
          onClick={elementScrollRight}
          css={mix(cssMixins.buttonStyle)}
        >
          {'▶'}
        </Div>
      </Div>
    </>
  )
}
export default GroupScroll
