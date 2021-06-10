import React, { ReactNode, useContext } from 'react'
import { useAppSettings } from './AppSettings'
import Div, { DivProps } from './Div'
import cssDefaults from 'baseUI/settings/cssDefaults'
import cssFont from 'baseUI/settings/cssFont'
import cssSize from 'baseUI/settings/cssSize'
import cssColor from 'baseUI/style/cssColor'
import { cssBrightness } from 'baseUI/style/cssFunctions'
import { mixCSSObjects } from 'baseUI/style/cssParser'
import cache from 'utils/functions/functionFactory/cache'
import { CSSObject } from '@emotion/serialize'
import addDefault from 'utils/functions/magic/addDefault'

export interface ButtonProps extends DivProps<'button'> {
  /**
   * @cssProp
   * @default 'fill'
   */
  type?: 'fill' | 'outline' | 'text'
  /**
   * @cssProp
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  children?: ReactNode
}

/**
 * @BaseUIComponent
 */
export default function Button(props: ButtonProps) {
  const { baseUICSS } = useAppSettings()
  return (
    <Div as='button' {...props} css={getButtonCSS(props, baseUICSS?.Button ?? {})}>
      {props.children ?? '🤨'}
    </Div>
  )
}

export interface ButtonDetailCSS {
  padding_small?: CSSObject['padding']
  fontSize_small?: CSSObject['fontSize']
  borderRadius_small?: CSSObject['borderRadius']

  padding_medium?: CSSObject['padding']
  fontSize_medium?: CSSObject['fontSize']
  borderRadius_medium?: CSSObject['borderRadius']

  padding_large?: CSSObject['padding']
  fontSize_large?: CSSObject['fontSize']
  borderRadius_large?: CSSObject['borderRadius']

  buttonTextColor?: CSSObject['color']
  buttonBackground_fill?: CSSObject['background']
  buttonBorderLineWidth_outline?: CSSObject['borderWidth']
  buttonBorderLineOpacity_outline?: CSSObject['opacity']
  buttonBorderColor_outline?: CSSObject['borderColor']
}

const getButtonCSS = cache((_props: ButtonProps, cssSettings: ButtonDetailCSS) => {
  const props = addDefault(_props, { type: 'fill', size: 'medium' })
  return mixCSSObjects(
    {
      style: 'none',
      borderWidth: 0,
      cursor: 'pointer',
      userSelect: 'none',
      width: 'max-content',
      boxSizing: 'border-box'
    },
    props.size === 'small' && {
      padding: cssSettings.padding_small ?? `${cssSize.mini} ${cssSize.large}`,
      fontSize: cssSettings.fontSize_small ?? cssFont.medium,
      borderRadius: cssSettings.borderRadius_small ?? cssSize.mini
    },
    props.size === 'medium' && {
      padding: cssSettings.padding_medium ?? `${cssSize.mini} ${cssSize.large}`,
      fontSize: cssSettings.fontSize_medium ?? cssFont.medium,
      borderRadius: cssSettings.borderRadius_medium ?? cssSize.mini
    },
    props.size === 'large' && {
      padding: cssSettings.padding_large ?? `${cssSize.mini} ${cssSize.large}`,
      fontSize: cssSettings.fontSize_large ?? cssFont.medium,
      borderRadius: cssSettings.borderRadius_large ?? cssSize.mini
    },
    props.type === 'fill' && {
      color: cssSettings.buttonTextColor ?? cssColor.white,
      position: 'relative',
      background: 'none',
      '::before': {
        content: "''",
        position: 'absolute',
        inset: '0',
        borderRadius: 'inherit',
        zIndex: '-1',
        background: cssSettings.buttonBackground_fill ?? cssDefaults.defaultBackgroundGray
      },
      ':hover::before': { filter: cssBrightness(1.4) },
      ':active::before': { filter: cssBrightness(0.8) }
    },
    props.type === 'outline' && {
      position: 'relative',
      background: cssColor.transparent,
      color: cssSettings.buttonTextColor,
      '::before': {
        content: "''",
        position: 'absolute',
        inset: '0',
        borderRadius: 'inherit',
        borderWidth: cssSettings.buttonBorderLineWidth_outline ?? '1px',
        borderStyle: 'solid',
        borderColor: cssSettings.buttonBorderColor_outline ?? 'currentcolor',
        opacity: cssSettings.buttonBorderLineOpacity_outline ?? '0.3',
        color: 'inherit'
      }
    },
    props.type === 'text' && {
      color: cssSettings.buttonTextColor,
      background: 'transparent'
    }
  )
})
