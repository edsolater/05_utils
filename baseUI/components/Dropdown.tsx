import React, { useState } from 'react'
import { BaseUIDiv, divProps, DivProps } from './Div'
import pick from 'utils/functions/object/pick'
import Card, { CardProps } from './Card'
import cache from 'utils/functions/functionFactory/cache'
import { mixCSSObjects } from 'baseUI/style/cssParser'
import { CSSPropertyValue } from 'baseUI/style/cssValue'
import { CSSObject } from '@emotion/react'
import cssDefaults from 'baseUI/settings/cssDefaults'
import addDefault from 'utils/functions/magic/addDefault'
import mergeObjects from 'utils/functions/object/mergeObjects'
import { useAppSettings } from './AppSettings'
import { mergeDeepObject } from 'utils/functions/merge'

// 应该就是一种 Card 的特殊呈现形式
/**
 * @BaseUIComponent
 */
export interface DropdownProps extends DivProps {
  toggleBy?: 'click' | 'hover'
  props_Card?: CardProps
  /**@cssProps */
  distance?: CSSPropertyValue<'gap'>
}

export interface DropdownSprops extends DropdownProps {
  cardColor?: CSSPropertyValue<'color'>
}


const defaultSprops: DropdownSprops = {
  distance: '16px',
  cardColor: cssDefaults.whiteCard
  // props_Card: { css: { background: cssDefaults.defaultBackgroundGray } } //TODO
}

const getCSS = cache((props: DropdownSprops) =>
  mixCSSObjects({
    position: 'relative'
  })
)
const getCardCSS = cache((props: DropdownSprops) =>
  mixCSSObjects({
    position: 'absolute',
    background: props.cardColor,
    top: `calc(100% + ${props.distance})`,
    zIndex: '1'
  })
)

export default function Dropdown(props: DropdownProps) {
  const appSettings = useAppSettings()
  const sprops = addDefault(mergeObjects(props, appSettings.globalProps?.Dropdown), defaultSprops)
  const [opened, setopened] = useState(false)
  console.log('sprops: ', sprops) // FIXME
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
          {...mergeDeepObject([
            {
              classNames: 'Dropdown-Card',
              css: getCardCSS(sprops)
            },
            sprops.props_Card
          ])}
        />
      )}
    </BaseUIDiv>
  )
}
