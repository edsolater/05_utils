import React, { useState } from 'react'
import { BaseUIDiv, divProps, DivProps } from './Div'
import pick from 'utils/functions/object/pick'
import Card, { CardProps } from './Card'
import cache from 'utils/functions/functionFactory/cache'
import { mixCSSObjects } from 'baseUI/style/cssParser'

// 应该就是一种 Card 的特殊呈现形式
/**
 * @BaseUIComponent
 */
export interface DropdownProps extends DivProps {
  toggleBy?: 'click' | 'hover'
  cardProps?: CardProps
}

export interface DropdownSprops extends DropdownProps {}

const getCSS = cache((props: DropdownProps) =>
  mixCSSObjects({
    position: 'relative'
  })
)
const getCardCSS = cache((props: DropdownProps) =>
  mixCSSObjects({
    position: 'absolute',
    top: 'calc(100% + 8px)'
  })
)

export default function Dropdown(props: DropdownProps) {
  const [opened, setopened] = useState(false)

  return (
    <BaseUIDiv
      {...pick(props, divProps)}
      _className='Dropdown'
      _css={getCSS(props)}
      _onHover={({ now }) => props.toggleBy === 'hover' && setopened(now === 'start')}
      _onClick={() => setopened((b) => !b)}
    >
      {props.children}
      {opened && ( //TODO：这个if逻辑导致每次都要重新加载整个卡片内容，就第一次是整体加载，然后都是显示/隐藏 //IDEA: 把这个显示的逻辑单独提取成一个组件
        // TODO: 要换成 HeadlessUI 的形式
        <Card
          {...props.cardProps}
          className='Dropdown-card'
          css={[props.cardProps?.css, getCardCSS(props)]}
        />
      )}
    </BaseUIDiv>
  )
}
