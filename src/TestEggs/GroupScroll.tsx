import React, { Fragment, ReactNode, useMemo, useRef } from 'react'
import Div from 'baseUI/Div'
import { splitToGroups } from 'utils/array/splitToGroups'
import { toPer } from 'style/cssUnits'
import { mix, cssMixins } from 'style/cssMixins'
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
  groupCount,
  renderItem
}: {
  /**隐藏scrollbar */
  hideScrollbar?: boolean
  items: T[]
  /**单个grop中的item数量 */
  groupCount: number
  renderItem: (item: T, itemIndex: number) => ReactNode
}) => {
  const groupedItems = useMemo(() => splitToGroups(items, groupCount), [items, groupCount])
  const outterRef = useRef<HTMLDivElement>()
  return (
    <>
      <Div domRef={outterRef} className='group-scroll-outter' css={cssOutter(hideScrollbar)}>
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
      <Div
        className='group-scroll-controller'
        css={mix(cssMixins.horizontalLayout, { fontSize: '3em' })}
      >
        <Div
          className='group-scroll-controller-left-arrow'
          onClick={() => {
            outterRef.current?.scrollBy({
              left: -1 * outterRef.current.clientWidth,
              behavior: 'smooth'
            })
          }}
          css={{ cursor: 'pointer', userSelect: 'none' }}
        >
          {'◀'}
        </Div>
        <Div
          className='group-scroll-controller-right-arrow'
          onClick={() => {
            outterRef.current?.scrollBy({
              left: outterRef.current.clientWidth,
              behavior: 'smooth'
            })
          }}
          css={{ cursor: 'pointer', userSelect: 'none' }}
        >
          {'▶'}
        </Div>
      </Div>
    </>
  )
}
export default GroupScroll
