import { DivProps } from 'baseUI/components/Div'
import React from 'react'
import { toPx } from 'baseUI/style/cssUnits'
import { BaseUIDiv } from 'baseUI/components'
import cssTheme from 'baseUI/settings/cssTheme'
export interface ExampleCardProps extends DivProps {
  category?: 'hooks' | 'baseUI/componentComponent' | 'SideEffectComponent' | 'TemplateComponent' | 'WrapperComponent'
  title?: string
}
const ExampleCard = (props: ExampleCardProps) => (
  <BaseUIDiv
    {...props}
    _css={{
      display: 'grid',
      position: 'relative',
      gap: 32,
      boxShadow: cssTheme.shadow.smooth,
      width: 'clamp(400px, 80vw, 1200px)',
      margin: '32px auto',
      borderRadius: 8,
      padding: toPx([8, 16])
    }}
  >
    <h1>{props.title}</h1>
    {props.children}
  </BaseUIDiv>
)
export default ExampleCard
