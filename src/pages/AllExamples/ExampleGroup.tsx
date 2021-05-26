import Caption from 'baseUI/Caption'
import Div, { DivProps } from 'baseUI/Div'
import RowBox from 'baseUI/RowBox'
import React from 'react'
export interface ExampleGroupProps extends DivProps {
  caption?: string
}
export default function ExampleGroup(props: ExampleGroupProps) {
  return (
    <Div>
      {props.caption && (
        <Caption css={{ margin: '16px 0', fontSize: '1.2em', fontWeight: 'bold' }}>
          {props.caption}
        </Caption>
      )}
      <Div css={{ display: 'grid', gap: 8 }}>
        <RowBox noStratch>{props.children}</RowBox>
      </Div>
    </Div>
  )
}
