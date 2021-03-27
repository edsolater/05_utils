import Div from 'baseUI/Div'
import React from 'react'
import { toPx } from 'style/cssUnits'
import { cssValues } from 'style/cssValue'

const ExampleCard = (props) => (
  <Div
    {...props}
    css={{
      display: 'grid',
      gap: 32,
      boxShadow: cssValues.smoothShadow,
      width: 'clamp(400px, 80vw, 1200px)',
      margin: '32px auto',
      borderRadius: 8,
      padding: toPx(8, 16)
    }}
  />
)
export default ExampleCard
