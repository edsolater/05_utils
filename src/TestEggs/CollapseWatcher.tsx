import Div from 'baseUI/__Div'
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
    { width: 100, height: 100, background: 'seagreen' },
    { width: 100, height: 100, background: 'crimson' },
    { width: 100, height: 100, background: 'dodgerblue' }
  ])
  const itemOrderRef = useRef<(ItemInfo & { el?: HTMLDivElement })[]>(itemOrderState)
  function sortItem() {
    // TODO: 对列表进行碰撞检测的逻辑
  }
  function reportMove() {
    if (!timeoutId.current) {
      timeoutId.current = window.setTimeout(() => {
        // 清空timeoutID
        timeoutId.current = 0
        console.log('100ms 执行一次')
      }, 100)
    }
  }
  return (
    <Div css={{ borderWidth: 1, borderColor: 'green' }}>
      {itemOrderState.map((item, index) => (
        <Transformable
          domRef={el => itemOrderRef.current[index]}
          onMove={reportMove}
          key={index}
          canInertialSlide
        >
          <Div css={item} />
        </Transformable>
      ))}
    </Div>
  )
}
export default CollapseWatcher
