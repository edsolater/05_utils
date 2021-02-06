import Div from 'baseUI/Div'
import React, { ReactNode, useMemo } from 'react'
/**
 * 以${groupSize}为一组，进行分割
 * @param items 原数组
 * @param groupSize 分割的块的容量
 * @example
 * const splited = splitToGroups(['aa', 'bb', 'cc'], 2) // [['aa','bb'], ['cc']]
 */
function splitToGroups<T>(items: T[], groupSize: number) {
  const result: T[][] = []
  let group: T[] = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    group.push(item)
    if (group.length === groupSize || i === items.length - 1) {
      result.push(group)
      group = []
    }
  }
  return result
}

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
    <Div css={{ display: 'flex' }}>
      {splited.map((group, groupIndex) => (
        <Div className='group' css={{ display: 'flex', gap: 8 }} key={groupIndex}>
          {group.map(renderItem)}
        </Div>
      ))}
    </Div>
  )
}
export default GroupScroll
