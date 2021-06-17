import React from 'react'
import { pick } from 'utils/functions/object'
import { BaseUIDiv } from '.'
import { injectAppSetting } from './AppSettings'
import { DivProps, divProps } from './Div'
import useCSS from '../hooks/useCSS'
import uiCSS from 'baseUI/settings/uiCSS'
import { toCssValue } from 'baseUI/style/cssUnits'
import { CSSPropertyValue } from 'baseUI/style/cssValue'
import cssTheme from 'baseUI/settings/cssTheme'
import { Profiler } from 'inspector'

export interface CardProps extends DivProps {
  /**
   * @cssProps 卡片的颜色
   */
  color?: CSSPropertyValue<'color'>

  /**
   * @cssProps 卡片的背景图片（background能接收即可）
   */
  bg?: CSSPropertyValue<'background'>

  /**
   * @cssProps 卡片的宽度
   */
  width?: number | string
  /**
   * @cssProps 卡片的高度
   */
  height?: number | string
  /**
   * @cssProps 卡片的圆角程度
   * @default 'medium'
   */
  borderRadius?: 'small' | 'medium' | 'large'
}

/**
 * @BaseUIComponent
 */
function Card(props: CardProps) {
  // useCSS should be an global hooks. Or not a hooks at all
  // TODO: it can have an identifier. @example: useCSS('Card', ()=>ICSS, [dependentList])
  const css = useCSS(props, (props) => ({
    width: toCssValue(props.width),
    height: toCssValue(props.height),
    borderRadius:
      props.borderRadius === 'small'
        ? uiCSS.Card['borderRadius--small']
        : props.borderRadius === 'medium'
        ? uiCSS.Card['borderRadius--medium']
        : uiCSS.Card['borderRadius--large'],
    boxShadow: cssTheme.shadow.smooth,
    background: props.bg ?? cssTheme.color.whiteCard,
    backgroundColor: props.color
  }))
  return <BaseUIDiv {...pick(props, divProps)} _css={css} />
}

export default injectAppSetting(Card, { borderRadius: 'medium' })
