import Div from 'baseUI/Div'
import React, { ReactNode } from 'react'

const GroupScroll = <T extends any>(props: {
  items: T[]
  renderItem: (item: T, itemIndex: number) => ReactNode
}) => {
  return (
    <Div css={{ display: 'grid', gap: 4, height: 250, overflow: 'hidden' }}>
      {props.items.map(props.renderItem)}
    </Div>
  )
}
export default GroupScroll
