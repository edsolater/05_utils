import Div, { DivProps } from 'baseUI/Div'
import React from 'react'
import { toPx } from 'style/cssUnits'
import { cssValues } from 'style/cssValue'
import { ExampleGroupProps } from './ExampleGroup'
export interface ExampleCardProps extends DivProps {
  title?: string
}
const ExampleCard = (props: ExampleCardProps) => (
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
  >
    <h1>{props.title}</h1>
    {props.children}
  </Div>
)
export default ExampleCard
