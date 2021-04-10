import Div from 'baseUI/Div'
import Transformable from 'baseUI/Transformable'
import React, { useRef, useState } from 'react'
interface ItemInfo {
  width: number
  height: number
  background: string
}
const CollapseWatcher = () => {
  const timeoutId = useRef(0)
  const [itemOrderState, setItemOrderState] = useState([
    { background: 'seagreen' },
    { background: 'crimson' },
    { background: 'dodgerblue' }
  ])
  return (
    <Div css={{ borderWidth: 1, borderColor: 'green' }}>
      {itemOrderState.map((item, index) => (
        <Transformable key={index} css={{ width: 100, height: 100 }}  canInertialSlide>
          <Div css={{ width: '100%', height: '100%', background: item.background }} />{' '}
          {/* //IDEA: 能不能把css都集中在子组件? */}
        </Transformable>
      ))}
    </Div>
  )
}
export default CollapseWatcher
