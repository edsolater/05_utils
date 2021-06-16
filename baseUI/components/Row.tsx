import React from 'react'
import { pick } from 'utils/functions/object'
import { BaseUIDiv } from '.'
import { injectAppSetting } from './AppSettings'
import { DivProps, divProps } from './Div'
import uiCSS from 'baseUI/settings/uiCSS'
import useCSS from 'baseUI/hooks/useCSS'

export interface RowProps extends DivProps {
  /**
   * @cssProps
   * "横"盒子空隙的大小
   */
  gapSize?: 'small' | 'medium' | 'large'

  /**@cssProps */
  noStratch?: boolean
}

/**
 * @BaseUIComponent
 *
 * 将子元素显示在一行，相当于flexbox
 */
const Row = (props: RowProps) => {
  const css = useCSS(props, (props) => [
    { display: 'flex', gap: uiCSS.Row[`gapSize--${props.gapSize}`] },
    props.noStratch && { alignItems: 'center' }
  ])
  return <BaseUIDiv {...pick(props, divProps)} _css={css} />
}
export default injectAppSetting(Row)
