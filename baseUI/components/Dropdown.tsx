import React, { ReactNode, useState } from 'react'
import { DivProps } from './Div'
import Card, { CardProps } from './Card'
import { CSSPropertyValue } from '../style/cssValue'
import { injectAppSetting } from './AppSettings'
import mergeProps from '../functions/mergeProps'
import { BaseUIDiv } from '.'
import cssTheme from 'baseUI/settings/cssTheme'
import { toICSS } from 'baseUI/style/cssParser'
import AttachButtonLike from './wrappers/AttachButtonLike'

// 应该就是一种 Card 的特殊呈现形式
/**
 * @BaseUIComponent
 */
export interface DropdownProps extends DivProps {
  toggleBy?: 'click' | 'hover'

  propsCard?: CardProps
  /**
   * @cssProps
   * this is just a shorcut of propsCard.css.background
   */
  cardBg?: CSSPropertyValue<'background'>

  /**@cssProps */
  gapFromButton?: CSSPropertyValue<'gap'>
  children?: ReactNode
}

const getCSS = toICSS(() => ({
  position: 'relative'
}))
const getCardCSS = toICSS(({ cardBg, gapFromButton }: DropdownProps) => ({
  position: 'absolute',
  background: cardBg,
  top: `calc(100% + ${gapFromButton})`,
  zIndex: '1'
}))

function Dropdown({
  toggleBy,
  propsCard,
  cardBg,
  gapFromButton,
  children,
  ...restProps
}: DropdownProps) {
  const [opened, setopened] = useState(false)

  const css = getCSS()
  const CardCss = getCardCSS({ cardBg, gapFromButton })
  return (
    <AttachButtonLike
      onClick={() => setopened((b) => !b)}
      onHover={({ now }) => toggleBy === 'hover' && setopened(now === 'start')}
    >
      <BaseUIDiv {...restProps} _className='Dropdown' _css={css}>
        {children}
        {opened && ( //TODO：这个if逻辑导致每次都要重新加载整个卡片内容，就第一次是整体加载，然后都是显示/隐藏 //IDEA: 把这个显示的逻辑单独提取成一个组件
          // TODO: 要换成 HeadlessUI 的形式
          <Card
            {...mergeProps(
              {
                classNames: 'Dropdown-Card',
                css: CardCss
              },
              propsCard
            )}
          />
        )}
      </BaseUIDiv>
    </AttachButtonLike>
  )
}

export default injectAppSetting(Dropdown, {
  gapFromButton: '16px',
  cardBg: cssTheme.color.whiteCard
})
