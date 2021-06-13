import React, { useState } from 'react'
import { BaseUIDiv, divProps, DivProps } from './Div'
import pick from 'utils/functions/object/pick'
import Card, { CardProps } from './Card'
import cache from 'utils/functions/functionFactory/cache'
import { mixCSSObjects } from 'baseUI/style/cssParser'
import { CSSPropertyValue } from 'baseUI/style/cssValue'
import cssDefaults from 'baseUI/settings/cssDefaults'
import { useAppSettings } from './AppSettings'
import mergeProps from 'baseUI/functions/mergeProps'
import addDefaultProps from 'baseUI/functions/addDefaultProps'

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

export interface DropdownSprops extends DropdownProps {
}

const defaultSprops: DropdownSprops = {
  gapFromButton: '16px',
  cardBg: cssDefaults.whiteCard
}

const getCSS = cache((sprops: DropdownSprops) =>
  mixCSSObjects({
    position: 'relative'
  })
)
const getCardCSS = cache((sprops: DropdownSprops) =>
  mixCSSObjects({
    position: 'absolute',
    background: sprops.cardBg,
    top: `calc(100% + ${sprops.gapFromButton})`,
    zIndex: '1'
  })
)

export default function Dropdown(props: DropdownProps) {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Dropdown, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)

  const [opened, setopened] = useState(false)

  return (
    <BaseUIDiv
      {...pick(sprops, divProps)}
      _className='Dropdown'
      _css={getCSS(sprops)}
      _onHover={({ now }) => sprops.toggleBy === 'hover' && setopened(now === 'start')}
      _onClick={() => setopened((b) => !b)}
    >
      {sprops.children}
      {opened && ( //TODO：这个if逻辑导致每次都要重新加载整个卡片内容，就第一次是整体加载，然后都是显示/隐藏 //IDEA: 把这个显示的逻辑单独提取成一个组件
        // TODO: 要换成 HeadlessUI 的形式
        <Card
          {...mergeProps(
            {
              classNames: 'Dropdown-Card',
              css: getCardCSS(sprops)
            },
            sprops.props_Card
          )}
        />
      )}
    </BaseUIDiv>
  )
}
