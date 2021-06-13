import React from 'react'
import { useAppSettings } from './AppSettings'
import { BaseUIDiv, divProps, DivProps } from './Div'
import cssDefaults from 'baseUI/settings/cssDefaults'
import cssFont from 'baseUI/settings/cssFont'
import cssSize from 'baseUI/settings/cssSize'
import cssColor from 'baseUI/style/cssColor'
import { cssBrightness } from 'baseUI/style/cssFunctions'
import { mixCSSObjects } from 'baseUI/style/cssParser'
import cache from 'utils/functions/functionFactory/cache'
import { CSSObject } from '@emotion/serialize'
import pick from 'utils/functions/object/pick'
import mergeProps from 'baseUI/functions/mergeProps'
import addDefaultProps from 'baseUI/functions/addDefaultProps'

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
  'padding--small'?: Extract<CSSObject['padding'], string>
  'fontSize--small'?: Extract<CSSObject['fontSize'], string>
  'borderRadius--small'?: Extract<CSSObject['borderRadius'], string>

  'padding--medium'?: Extract<CSSObject['padding'], string>
  'fontSize--medium'?: Extract<CSSObject['fontSize'], string>
  'borderRadius--medium'?: Extract<CSSObject['borderRadius'], string>

  'padding--large'?: Extract<CSSObject['padding'], string>
  'fontSize--large'?: Extract<CSSObject['fontSize'], string>
  'borderRadius--large'?: Extract<CSSObject['borderRadius'], string>

  'textColor--fill'?: Extract<CSSObject['color'], string>
  'background--fill'?: Extract<CSSObject['background'], string>
  'textColor--outline'?: Extract<CSSObject['color'], string>
  'borderColor--outline'?: Extract<CSSObject['borderColor'], string>
  'textColor--text'?: Extract<CSSObject['color'], string>
  'borderWidth--outline'?: Extract<CSSObject['borderWidth'], string>
  'borderOpacity--outline'?: Extract<CSSObject['opacity'], string>
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
  'background--fill': cssDefaults.defaultBackgroundGray,
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
