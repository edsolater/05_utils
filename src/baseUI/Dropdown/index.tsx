import React, { useState } from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { useDropdownStyle, DropdownStyleProps } from './style'
import pick from 'utils/object/pick'
import Card, { CardProps } from 'baseUI/Card'

// 应该就是一种 Card 的特殊呈现形式
/**
 * @BaseUIComponent
 */
export interface DropdownProps extends DivProps, DropdownStyleProps {
  toggleBy?: 'click' | 'hover'
  cardProps?: CardProps
}
export default function Dropdown(props: DropdownProps) {
  const [opened, setopened] = useState(false)

  const { coreCss, dropdownCardCss } = useDropdownStyle(props)
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
      {opened && ( //TODO：这个if逻辑导致每次都要重新加载整个卡片内容，就第一次是整体加载，然后都是显示/隐藏 //IDEA: 把这个显示的逻辑单独提取成一个组件
        <Card
          {...props.cardProps}
          className='__dropdown-card'
          css={[props.cardProps?.css, dropdownCardCss]}
        />
      )}
    </Div>
  )
}
