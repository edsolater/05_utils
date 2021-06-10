import React from 'react'
import { mixCSSObjects } from '../style/cssParser'
import { BaseUIDiv, DivProps } from './Div'
import cache from 'utils/functions/functionFactory/cache'
import cssDefaults from 'baseUI/settings/cssDefaults'
import { CSSObject } from '@emotion/react'
import { useAppSettings } from './AppSettings'

export interface CaptionProps extends DivProps {
  /**
   * @cssProps
   */
  align?: 'left' | 'center' | 'right'
}

/**
 * @BaseUIComponent
 */
export default function Caption(props: CaptionProps) {
  const { baseUICSS } = useAppSettings()
  return <BaseUIDiv {...props} _css={getCSS(props, baseUICSS?.Caption ?? {})} />
}

export interface CaptionDetailCSS {
  captionTextColor?: CSSObject['color']
}

const getCSS = cache((props: CaptionProps, cssSetting: CaptionDetailCSS) =>
  mixCSSObjects(
    {
      fontSize: '0.8em',
      color: cssSetting.captionTextColor ?? cssDefaults.grayText
    },
    props.align === 'left' && { textAlign: 'left' },
    props.align === 'center' && { textAlign: 'center' },
    props.align === 'right' && { textAlign: 'right' }
  )
)
