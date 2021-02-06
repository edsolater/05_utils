import React, { Fragment, ReactNode, useMemo } from 'react'
import Div, { ICSS } from 'baseUI/Div'
import { splitToGroups } from 'utils/array/splitToGroups'
import { toPer } from 'style/cssUnits'
const cssOutter: ICSS = { display: 'flex', scrollSnapType: 'x mandatory', overflow: 'auto' }
const cssGroup: ICSS = {
  flex: '0 0 auto',
  display: 'flex',
  scrollSnapAlign: 'start',
  width: toPer(100),
  justifyContent:'space-around'
}
/**每次滚动一组 */
const GroupScroll = <T extends any>({
  items,
  groupCount,
  renderItem
}: {
  items: T[]
  /**单个grop中的item数量 */
  groupCount: number
  renderItem: (item: T, itemIndex: number) => ReactNode
}) => {
  const splited = useMemo(() => splitToGroups(items, groupCount), [items, groupCount])
  return (
    <Div className='scroll-outter' css={cssOutter}>
      {splited.map((group, groupIndex) => (
        <Div className='group' css={cssGroup} key={groupIndex}>
          {group.map((item, idx) => (
            <Fragment key={(item as any).key ?? (item as any).id ?? idx}>
              {renderItem(item, idx)}
            </Fragment>
          ))}
        </Div>
      ))}
    </Div>
  )
}
export default GroupScroll
