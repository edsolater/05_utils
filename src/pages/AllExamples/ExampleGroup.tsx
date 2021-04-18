import Caption from 'baseUI/Caption'
import Div from 'baseUI/Div'
import RowBox from 'baseUI/RowBox'
import React, { ReactNode } from 'react'

const ExampleGroup = (props: { children?: ReactNode; caption?: string }) => (
  <Div>
    <Caption css={{ margin: '16px 0', fontSize: '1.2em', fontWeight: 'bold' }}>
      {props.caption}
    </Caption>
    <Div css={{ display: 'grid', gap: 8 }}>
      <RowBox noStratch>{props.children}</RowBox>
    </Div>
  </Div>
)
export default ExampleGroup
