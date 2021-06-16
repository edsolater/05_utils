import React from 'react'
import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { CSSPropertyValue, mixCSSObjects } from 'baseUI/style'
import { cache } from 'utils/functions/functionFactory'
import { pick } from 'utils/functions/object'
import { useAppSettings } from './AppSettings'
import { DivProps, divProps } from './Div'
import { BaseUIDiv } from '.'
import { cssDefaultColor } from 'baseUI/settings/cssDefaults'

export interface CaptionProps extends DivProps {
  /**
   * @cssProps
   * @default 'left
   */
  align?: 'left' | 'center' | 'right'
}

export interface CaptionSprops extends CaptionProps {
  textColor?: CSSPropertyValue<'color'>
}

const defaultSprops: CaptionSprops = {
  align: 'left',
  textColor: cssDefaultColor.grayText
}

const getCSS = cache((sprops: CaptionSprops) =>
  mixCSSObjects(
    {
      fontSize: '0.8em',
      color: sprops.textColor
    },
    sprops.align === 'left' && { textAlign: 'left' },
    sprops.align === 'center' && { textAlign: 'center' },
    sprops.align === 'right' && { textAlign: 'right' }
  )
)

/**
 * @BaseUIComponent
 */
export default function Caption(props: CaptionProps) {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Caption, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)
  return <BaseUIDiv {...pick(sprops, divProps)} _css={getCSS(sprops)} />
}
