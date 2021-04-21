import Div from 'baseUI/Div'
import Transform from 'baseUI/Transform'
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
        <Transform key={index} css={{ width: 100, height: 100 }} resizable canInertialSlide>
          <Div css={{ width: '100%', height: '100%', background: item.background }} />{' '}
        </Transform>
      ))}
    </Div>
  )
}
export default CollapseWatcher
