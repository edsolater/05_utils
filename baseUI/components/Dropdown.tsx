import React, { useState } from 'react'
import { divProps, DivProps } from './Div'
import pick from 'utils/functions/object/pick'
import Card, { CardProps } from './Card'
import { CSSPropertyValue } from '../style/cssValue'
import { injectAppSetting } from './AppSettings'
import mergeProps from '../functions/mergeProps'
import { BaseUIDiv } from '.'
import cssTheme from 'baseUI/settings/cssTheme'
import useCSS from 'baseUI/hooks/useCSS'

// 应该就是一种 Card 的特殊呈现形式
/**
 * @BaseUIComponent
 */
export interface DropdownProps extends DivProps {
  toggleBy?: 'click' | 'hover'

  props_Card?: CardProps
  /**
   * @cssProps
   * this is just a shorcut of props_Card.css.background
   */
  cardBg?: CSSPropertyValue<'background'>

  /**@cssProps */
  gapFromButton?: CSSPropertyValue<'gap'>
}

function Dropdown(props: DropdownProps) {
  const [opened, setopened] = useState(false)

  const css = useCSS(props, (porps) => ({
    position: 'relative'
  }))
  const CardCss = useCSS(props, (porps) => ({
    position: 'absolute',
    background: props.cardBg,
    top: `calc(100% + ${props.gapFromButton})`,
    zIndex: '1'
  }))
  return (
    <BaseUIDiv
      {...pick(props, divProps)}
      _className='Dropdown'
      _css={css}
      _onHover={({ now }) => props.toggleBy === 'hover' && setopened(now === 'start')}
      _onClick={() => setopened((b) => !b)}
    >
      {props.children}
      {opened && ( //TODO：这个if逻辑导致每次都要重新加载整个卡片内容，就第一次是整体加载，然后都是显示/隐藏 //IDEA: 把这个显示的逻辑单独提取成一个组件
        // TODO: 要换成 HeadlessUI 的形式
        <Card
          {...mergeProps(
            {
              classNames: 'Dropdown-Card',
              css: CardCss
            },
            props.props_Card
          )}
        />
      )}
    </BaseUIDiv>
  )
}

export default injectAppSetting(Dropdown, {
  gapFromButton: '16px',
  cardBg: cssTheme.color.whiteCard
})
