import React from 'react'
import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { cache } from 'utils/functions/functionFactory'
import { pick } from 'utils/functions/object'
import { useAppSettings } from './AppSettings'
import { DivProps, divProps } from './Div'
import { BaseUIDiv } from '.'
import { mixCSSObjects } from 'baseUI/style/cssParser'
import { CSSPropertyValue } from 'baseUI/style/cssValue'
import cssTheme from 'baseUI/settings/cssTheme'

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
  textColor: cssTheme.color.grayText
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
