import React, { ReactNode, useContext } from 'react'
import { AppSettings } from './AppSettingsProvider'
import Div, { DivProps } from './Div'
import cssDefaults from 'baseUI/settings/cssDefaults'
import cssFont from 'baseUI/settings/cssFont'
import cssSize from 'baseUI/settings/cssSize'
import cssColor from 'baseUI/style/cssColor'
import { cssBrightness } from 'baseUI/style/cssFunctions'
import { mixCSSObjects } from 'baseUI/style/cssParser'
import cache from 'utils/functions/functionFactory/cache'
import { CSSObject } from '@emotion/serialize'

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
export default function Button({
  type = 'fill',
  size = 'medium',
  children,
  ...restProps
}: ButtonProps) {
  const appSettings = useContext(AppSettings)

  return (
    <Div
      as='button'
      {...restProps}
      css={getButtonCSS({ type, size }, appSettings.baseUICSS?.Button)}
    >
      {children ?? '🤨'}
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

const getButtonCSS = cache(({ size, type }: ButtonProps, cssSettings?: ButtonDetailCSS) =>
  mixCSSObjects(
    {
      style: 'none',
      borderWidth: 0,
      cursor: 'pointer',
      userSelect: 'none',
      width: 'max-content',
      boxSizing: 'border-box'
    },
    size === 'small' && {
      padding: cssSettings?.padding_small ?? `${cssSize.mini} ${cssSize.large}`,
      fontSize: cssSettings?.fontSize_small ?? cssFont.medium,
      borderRadius: cssSettings?.borderRadius_small ?? cssSize.mini
    },
    size === 'medium' && {
      padding: cssSettings?.padding_medium ?? `${cssSize.mini} ${cssSize.large}`,
      fontSize: cssSettings?.fontSize_medium ?? cssFont.medium,
      borderRadius: cssSettings?.borderRadius_medium ?? cssSize.mini
    },
    size === 'large' && {
      padding: cssSettings?.padding_large ?? `${cssSize.mini} ${cssSize.large}`,
      fontSize: cssSettings?.fontSize_large ?? cssFont.medium,
      borderRadius: cssSettings?.borderRadius_large ?? cssSize.mini
    },
    type === 'fill' && {
      color: cssSettings?.buttonTextColor ?? cssColor.white,
      position: 'relative',
      background: 'none',
      '::before': {
        content: "''",
        position: 'absolute',
        inset: '0',
        borderRadius: 'inherit',
        zIndex: '-1',
        background: cssDefaults.defaultBackgroundGray
      },
      ':hover::before': { filter: cssBrightness(1.4) },
      ':active::before': { filter: cssBrightness(0.8) }
    },
    type === 'outline' && {
      position: 'relative',
      background: cssColor.transparent,
      color: cssSettings?.buttonTextColor,
      '::before': {
        content: "''",
        position: 'absolute',
        inset: '0',
        borderRadius: 'inherit',
        borderWidth: cssSettings?.buttonBorderLineWidth_outline ?? '1px',
        borderStyle: 'solid',
        borderColor: cssSettings?.buttonBorderColor_outline ?? 'currentcolor',
        opacity: cssSettings?.buttonBorderLineOpacity_outline ?? '0.3',
        color: 'inherit'
      }
    },
    type === 'text' && {
      color: cssSettings?.buttonTextColor,
      background: 'transparent'
    }
  )
)
