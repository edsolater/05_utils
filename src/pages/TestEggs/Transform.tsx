import Div from 'baseUI/Div'
import Tramsform from 'baseUI/Transform'
import React, { useRef, useState } from 'react'
const CollapseWatcher = () => {
  const [itemOrderState, setItemOrderState] = useState([
    { background: 'seagreen' },
    { background: 'crimson' },
    { background: 'dodgerblue' }
  ])
  return (
    <Div css={{ borderWidth: 1, borderColor: 'green' }}>
      {itemOrderState.map((item, index) => (
        <Tramsform key={index} css={{ width: 100, height: 100 }} resizable canInertialSlide>
          <Div css={{ width: '100%', height: '100%', background: item.background }} />{' '}
          {/* //IDEA: 能不能把css都集中在子组件? */}
        </Tramsform>
      ))}
    </Div>
  )
}
export default CollapseWatcher
