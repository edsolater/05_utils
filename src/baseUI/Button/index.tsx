import React, { useContext } from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { getButtonCSS, ButtonStyleProps } from './defaultStyle'
import pick from 'utils/object/pick'
import { AppSettings } from 'baseUI/AppSettingsProvider'
import merge from 'utils/object/merge'

export interface ButtonProps extends DivProps<'button'>, ButtonStyleProps {}

/** TODO: 因为这不够 Headless，有内置CSS的缘故。这样复用性不高，必须要装emotion，并不headless  */
/**
 * 将子元素显示在一行，相当于flexbox
 */
const Button = (bareProps: ButtonProps) => {
  const { props: propsSetting, css: cssSettings } = useContext(AppSettings)
  const mixedProps = merge(propsSetting?.Button, bareProps)

  return (
    <Div
      as='button'
      {...pick(merge(propsSetting?.Button, bareProps), divProps)}
      css={getButtonCSS(cssSettings?.Button ?? {}, mixedProps)}
    >{mixedProps.children ?? '🤨'}</Div>
  )
}

export default Button
