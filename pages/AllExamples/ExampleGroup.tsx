import Caption from 'baseUI/component/Caption'
import Div, { BaseUIDiv, DivProps } from 'baseUI/component/Div'
import RowBox from 'baseUI/component/RowBox'
import React from 'react'
export interface ExampleGroupProps extends DivProps {
  caption?: string
}
export default function ExampleGroup(props: ExampleGroupProps) {
  return (
    <BaseUIDiv _className={`${ExampleGroup.name}`}>
      {props.caption && (
        <Caption css={{ margin: '16px 0', fontSize: '1.2em', fontWeight: 'bold' }}>
          {props.caption}
        </Caption>
      )}
      <Div css={{ display: 'grid', gap: 8 }}>
        <RowBox noStratch>{props.children}</RowBox>
      </Div>
    </BaseUIDiv>
  )
}