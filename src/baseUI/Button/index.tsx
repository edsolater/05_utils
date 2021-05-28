import React, { useContext } from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { getButtonCSS, ButtonStyleProps } from './defaultStyle'
import pick from 'utils/object/pick'
import { AppSettings } from 'baseUI/AppSettingsProvider'
import merge from 'utils/object/merge'

export interface ButtonProps extends DivProps<'button'>, ButtonStyleProps {}

/** TODO: 因为这不够 Headless，有内置CSS的缘故。这样复用性不高，必须要装emotion，并不headless  */
/**
 * @BaseUIComponent
 */
const Button = (bareProps: ButtonProps) => {
  const appSettings = useContext(AppSettings)
  const mixedProps = merge(appSettings.props?.Button, bareProps)

  return (
    <Div
      as='button'
      {...pick(mixedProps, divProps)}
      css={getButtonCSS(appSettings.css?.Button ?? {}, mixedProps)}
    >
      {mixedProps.children ?? '🤨'}
    </Div>
  )
}

export default Button
