import { BaseUIDiv } from 'baseUI/components'
import Caption from 'baseUI/components/Caption'
import { DivProps } from 'baseUI/components/Div'
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
      <Row noStratch css={{ gap: '8px' }}>
        {props.children}
      </Row>
    </BaseUIDiv>
  )
}
