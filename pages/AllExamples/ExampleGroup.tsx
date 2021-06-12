import Caption from 'baseUI/components/Caption'
import Div, { BaseUIDiv, DivProps } from 'baseUI/components/Div'
import Row from 'baseUI/components/Row'
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
        <Row noStratch>{props.children}</Row>
      </Div>
    </BaseUIDiv>
  )
}
