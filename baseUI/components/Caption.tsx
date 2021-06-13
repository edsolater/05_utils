import React from 'react'
import { mixCSSObjects } from '../style/cssParser'
import { BaseUIDiv, divProps, DivProps } from './Div'
import cache from 'utils/functions/functionFactory/cache'
import cssDefaults from 'baseUI/settings/cssDefaults'
import { CSSObject } from '@emotion/react'
import { useAppSettings } from './AppSettings'
import pick from 'utils/functions/object/pick'
import mergeProps from 'baseUI/functions/mergeProps'
import addDefaultProps from 'baseUI/functions/addDefaultProps'

export interface CaptionProps extends DivProps {
  /**
   * @cssProps
   * @default 'left
   */
  align?: 'left' | 'center' | 'right'
}

export interface CaptionSprops extends CaptionProps {
  textColor?: Extract<CSSObject['color'], string>
}

const defaultSprops: CaptionSprops = {
  align: 'left',
  textColor: cssDefaults.grayText
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
