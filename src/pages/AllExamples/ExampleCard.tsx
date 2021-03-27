import Div, { DivProps } from 'baseUI/Div'
import React from 'react'
import { mix } from 'style/cssMixins'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { ICSS } from 'style/cssType'
import { toPx } from 'style/cssUnits'

interface ExampleCardCSSPart {
  primary?: ICSS
  border?: ICSS
  text?: ICSS
}
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
const cssExampleCardBaseStyle = ({ type, cssPart, css }: ExampleCardProps) =>
  mix(
    {
      appearance: 'none', // 好像并没有实际效果
      borderRadius: 4,
      // padding: '64px',
      borderWidth: 0,
      cursor: 'pointer',
      userSelect: 'none',
      width: 'max-content',
      boxSizing: 'border-box'
    },
    type === 'primary' && {
      color: cssVar('--exampleCard-text-color', 'white'),
      backgroundColor: cssVar('--exampleCard-background-color', '#666'),
      ':hover': { filter: cssBrightness(1.4) },
      ':active': { filter: cssBrightness(0.8) }
    },
    type === 'border' && {
      position: 'relative',
      backgroundColor: 'transparent',
      color: cssVar('--exampleCard-text-color'),
      '::before': {
        content: "''",
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: cssVar('--exampleCard-border-color', 'currentcolor'),
        opacity: 0.3,
        color: 'inherit'
      }
    },
    type === 'text' && {
      color: cssVar('--exampleCard-text-color')
    },

    type === 'primary' && cssPart?.primary,
    type === 'border' && cssPart?.border,
    type === 'text' && cssPart?.text,
    css
  )

export interface ExampleCardProps extends DivProps {
  /**对组件的每一个part或虚拟part定义样式 */
  cssPart?: ExampleCardCSSPart
  /**
   * 按钮元素的权重
   * 默认：border（空心按钮）
   */
  type?: 'primary' | 'border' | 'text'
}

/**
 * 普通ExampleCard，TODO
 */
const ExampleCard = ({ type = 'border', cssPart, css, ...restProps }: ExampleCardProps) => (
  <Div {...restProps} css={mix(cssExampleCardBaseStyle({ type, cssPart, css }))}></Div>
)

export default ExampleCard
