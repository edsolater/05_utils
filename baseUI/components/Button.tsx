import React from 'react'
import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { cssSize, cssFont } from 'baseUI/settings'
import { CSSPropertyValue, cssColor, mixCSSObjects, cssBrightness } from 'baseUI/style'
import { useAppSettings } from './AppSettings'
import { DivProps, divProps } from './Div'
import { cache } from 'utils/functions/functionFactory'
import { pick } from 'utils/functions/object'
import BaseUIDiv from './BaseUIDiv'
import { cssDefaultColor } from 'baseUI/settings/cssDefaults'

export interface ButtonProps extends DivProps<'button'> {
  /**
   * @cssProps
   * @default 'fill'
   */
  type?: 'fill' | 'outline' | 'text'
  /**
   * @cssProps
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
}

export interface ButtonSprops extends ButtonProps {
  'padding--small'?: CSSPropertyValue<'padding'>
  'fontSize--small'?: CSSPropertyValue<'fontSize'>
  'borderRadius--small'?: CSSPropertyValue<'borderRadius'>

  'padding--medium'?: CSSPropertyValue<'padding'>
  'fontSize--medium'?: CSSPropertyValue<'fontSize'>
  'borderRadius--medium'?: CSSPropertyValue<'borderRadius'>

  'padding--large'?: CSSPropertyValue<'padding'>
  'fontSize--large'?: CSSPropertyValue<'fontSize'>
  'borderRadius--large'?: CSSPropertyValue<'borderRadius'>

  'textColor--fill'?: CSSPropertyValue<'color'>
  'background--fill'?: CSSPropertyValue<'background'>
  'textColor--outline'?: CSSPropertyValue<'color'>
  'borderColor--outline'?: CSSPropertyValue<'borderColor'>
  'textColor--text'?: CSSPropertyValue<'color'>
  'borderWidth--outline'?: CSSPropertyValue<'borderWidth'>
  'borderOpacity--outline'?: CSSPropertyValue<'opacity'>
}

const defaultSprops: ButtonSprops = {
  type: 'fill',
  size: 'medium',

  'padding--small': `${cssSize.mini} ${cssSize.large}`,
  'fontSize--small': cssFont.medium,
  'borderRadius--small': cssSize.mini,

  'padding--medium': `${cssSize.mini} ${cssSize.large}`,
  'fontSize--medium': cssFont.medium,
  'borderRadius--medium': cssSize.mini,

  'padding--large': `${cssSize.mini} ${cssSize.large}`,
  'fontSize--large': cssFont.medium,
  'borderRadius--large': cssSize.mini,

  'textColor--fill': cssColor.white,
  'background--fill': cssDefaultColor.defaultBackgroundGray,
  'borderWidth--outline': '1px',
  'borderColor--outline': 'currentcolor',
  'borderOpacity--outline': '0.3'
}

const getCSS = cache((sprops: ButtonSprops) =>
  mixCSSObjects(
    {
      style: 'none',
      borderWidth: 0,
      cursor: 'pointer',
      userSelect: 'none',
      width: 'max-content',
      boxSizing: 'border-box'
    },
    sprops.size === 'small' && {
      padding: sprops['padding--small'],
      fontSize: sprops['fontSize--small'],
      borderRadius: sprops['borderRadius--small']
    },
    sprops.size === 'medium' && {
      padding: sprops['padding--medium'],
      fontSize: sprops['fontSize--medium'],
      borderRadius: sprops['borderRadius--medium']
    },
    sprops.size === 'large' && {
      padding: sprops['padding--large'],
      fontSize: sprops['fontSize--large'],
      borderRadius: sprops['borderRadius--large']
    },
    sprops.type === 'fill' && {
      color: sprops['textColor--fill'],
      position: 'relative',
      background: 'none',
      '::before': {
        content: "''",
        position: 'absolute',
        inset: '0',
        borderRadius: 'inherit',
        zIndex: '-1',
        background: sprops['background--fill']
      },
      ':hover::before': { filter: cssBrightness(1.4) },
      ':active::before': { filter: cssBrightness(0.8) }
    },
    sprops.type === 'outline' && {
      position: 'relative',
      background: cssColor.transparent,
      color: sprops['textColor--outline'],
      '::before': {
        content: "''",
        position: 'absolute',
        inset: '0',
        borderRadius: 'inherit',
        borderWidth: sprops['borderWidth--outline'] ?? '1px',
        borderStyle: 'solid',
        borderColor: sprops['borderColor--outline'] ?? 'currentcolor',
        opacity: sprops['borderOpacity--outline'] ?? '0.3',
        color: 'inherit'
      }
    },
    sprops.type === 'text' && {
      color: sprops['textColor--text'],
      background: 'transparent'
    }
  )
)

/**
 * @UIComponent Button
 */
export default function Button(props: ButtonProps) {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Button, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)
  return (
    <BaseUIDiv {...pick(sprops, divProps)} as='button' _css={getCSS(sprops)}>
      {sprops.children ?? '🤨'}
    </BaseUIDiv>
  )
}
