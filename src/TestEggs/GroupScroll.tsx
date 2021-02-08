import React, { Fragment, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import Div from 'baseUI/Div'
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
const cssGroup = mix(cssMixins.solidFlexItem, {
  display: 'flex',
  scrollSnapAlign: 'start',
  width: toPer(100),
  justifyContent: 'space-around'
})
/**每次滚动一组 */
const GroupScroll = <T extends any>({
  hideScrollbar,
  items,
  groupCapacity,
  renderItem
}: {
  /**隐藏scrollbar */
  hideScrollbar?: boolean
  items: T[]
  /**单个grop中的item数量 */
  groupCapacity: number
  renderItem: (item: T, itemIndex: number) => ReactNode
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const prevCurrentIndex = useRef(0) // TODO: 我觉得这里能封装成一个hooks啊, useState与useEffect结合

  const groupedItems = useMemo(() => splitToGroups(items, groupCapacity), [items, groupCapacity])
  const outterRef = useRef<HTMLDivElement>()

  const plusCurrentIndex = () => {
    const canScrollRight = currentIndex !== groupedItems.length - 1
    if (canScrollRight) {
      setCurrentIndex((n) => {
        prevCurrentIndex.current = n
        return n + 1
      })
    }
  }
  const minusCurrentIndex = () => {
    const canScrollLeft = currentIndex !== 0
    if (canScrollLeft) {
      setCurrentIndex((n) => {
        prevCurrentIndex.current = n
        return n - 1
      })
    }
  }

  // 就是要记录scroll的位置数据，TODO：应该要抽成一个组件
  const prevScrollTop = useRef(0)
  const prevScrollLeft = useRef(0)
  useEffect(() => {
    prevScrollTop.current = outterRef.current?.scrollTop ?? 0
    prevScrollLeft.current = outterRef.current?.scrollLeft ?? 0
  }, [])
  /**
   * 元素向左滚动一屏
   * @param el 元素
   */
  const elementScrollLeft = (el: HTMLElement | undefined | null) =>
    el?.scrollBy({ left: -1 * el.clientWidth, behavior: 'smooth' })
  /**
   * 元素向右滚动一屏
   * @param el 元素
   */
  const elementScrollRight = (el: HTMLElement | undefined | null) =>
    el?.scrollBy({ left: el.clientWidth, behavior: 'smooth' })

  useEffect(() => {
    if (currentIndex > prevCurrentIndex.current) elementScrollRight(outterRef.current!)
    if (currentIndex < prevCurrentIndex.current) elementScrollLeft(outterRef.current!)
  }, [currentIndex])

  const attachGroupScroll = (el: HTMLElement | undefined | null) => {
    el?.addEventListener(
      'scroll',
      (ev) => {
        const scrollX = el.scrollLeft - prevScrollLeft.current
        const scrollY = el.scrollTop - prevScrollTop.current
        prevScrollTop.current = el.scrollTop
        prevScrollLeft.current = el.scrollLeft

        console.log('scrollX: ', scrollX)
        console.log('scrollY: ', scrollY)

        // 怎么能够检测到元素的滚动呢？我觉得还需要个isScrolling
        scrollX > 0 && plusCurrentIndex
        scrollX < 0 && minusCurrentIndex
      },
      { passive: true }
    )
  }

  return (
    <>
      {/* 展示 TODO: 页面滚轮要能直接整屏滚动 */}
      {/* 滚动检测元素 */}
      <Div
        domRef={mergeRefs(outterRef, attachGroupScroll)}
        className='group-scroll-outter'
        css={cssOutter(hideScrollbar)}
      >
        {groupedItems.map((group, groupIndex) => (
          <Div className='group-scroll-group' css={cssGroup} key={groupIndex}>
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
          onClick={minusCurrentIndex}
          css={mix(cssMixins.buttonStyle)}
        >
          {'◀'}
        </Div>
        {currentIndex}
        <Div
          className='group-scroll-controller-right-arrow'
          onClick={plusCurrentIndex}
          css={mix(cssMixins.buttonStyle)}
        >
          {'▶'}
        </Div>
      </Div>
    </>
  )
}
export default GroupScroll

/**禁止滚动 */
function disableScrolling(el: HTMLElement | undefined | null) {
  if (!el) return
  el.style['overflow'] = 'hidden'
}
/**允许滚动 */
function restoreScrolling(el: HTMLElement | undefined | null) {
  if (!el) return
  el.style['overflow'] = ''
}
