import React, { useState } from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { useFeature as useFeatureStyle, FeatureProps as FeatureStyleProps } from './style.feature'
import pick from 'utils/object/pick'
import Card, { CardProps } from 'baseUI/Card'

// 应该就是一种 Card 的特殊呈现形式
export interface DropdownProps extends DivProps, FeatureStyleProps {
  toggleBy?: 'click' | 'hover'
  cardProps?: CardProps
}
export default function Dropdown(props: DropdownProps) {
  const [opened, setopened] = useState(false)

  const { coreCss, dropdownCardCss } = useFeatureStyle(props)
  return (
    <Div
      {...pick(props, divProps)}
      className={[props.className, '__dropdown-wrapper']}
      css={[props.css, coreCss]}
      onHoverStart={() => props.toggleBy === 'hover' && setopened(true)}
      onHoverEnd={() => props.toggleBy === 'hover' && setopened(false)}
      onClick={() => setopened((b) => !b)}
    >
      {props.children}
      {opened && (
        <Card
          {...props.cardProps}
          className='__dropdown-card'
          css={[props.cardProps?.css, dropdownCardCss]}
        />
      )}
    </Div>
  )
}
