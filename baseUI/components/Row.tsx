import React from 'react'
import { BaseUIDiv } from '.'
import { injectAppSetting } from './AppSettings'
import { DivProps } from './Div'
import uiCSS from 'baseUI/settings/uiCSS'
import { toICSS } from 'baseUI/style/cssParser'

export interface RowProps extends DivProps {
  /**
   * @cssProps
   * "横"盒子空隙的大小
   */
  gapSize?: 'small' | 'medium' | 'large'

  /**@cssProps */
  noStratch?: boolean
}

const getCSS = toICSS(({ noStratch, gapSize }: RowProps) => [
  { display: 'flex', gap: uiCSS.Row[`gapSize--${gapSize}`] },
  noStratch && { alignItems: 'center' }
])

/**
 * @BaseUIComponent
 *
 * 将子元素显示在一行，相当于flexbox
 */
const Row = ({ gapSize, noStratch, ...restProps }: RowProps) => {
  const css = getCSS({ noStratch, gapSize })
  return <BaseUIDiv {...restProps} _css={css} />
}
export default injectAppSetting(Row)
