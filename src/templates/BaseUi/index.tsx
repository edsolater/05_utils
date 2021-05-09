import React, { useContext } from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mixCSSObjects } from 'style/cssParser'
import { useBaseUiStyle, BaseUiStyleProps } from './style'
import pick from 'utils/object/pick'
import { AppSettings } from 'baseUI/AppSettingsProvider'
import merge from 'utils/object/merge'

export interface BaseUiProps extends DivProps<'button'>, BaseUiStyleProps {}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const BaseUi = (props: BaseUiProps) => {
  const defaultProps = useContext(AppSettings)
  const mprops = merge(defaultProps.props, props)
  const { coreCss } = useBaseUiStyle(mprops)
  return <Div as='button' {...pick(mprops, divProps)} css={mixCSSObjects(mprops.css, coreCss)}></Div>
}

export default BaseUi
