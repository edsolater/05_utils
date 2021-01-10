import Div from 'baseUI/Div'
import Transformable from 'baseUI/Transformable'
import React from 'react'

const ElementCollapse = () => {
  function reportMove() {
    window.requestIdleCallback(() => {
      console.log(3)
    })
  }
  return (
    <Div css={{ borderWidth: 1, borderColor: 'green' }}>
      <Transformable onMove={reportMove}>
        <Div css={{ width: 200, height: 200, background: 'seagreen' }} />
      </Transformable>
      <Transformable onMove={reportMove}>
        <Div css={{ width: 200, height: 200, background: 'crimson' }} />
      </Transformable>
      <Transformable onMove={reportMove}>
        <Div css={{ width: 200, height: 200, background: 'dodgerblue' }} />
      </Transformable>
    </Div>
  )
}
export default ElementCollapse
