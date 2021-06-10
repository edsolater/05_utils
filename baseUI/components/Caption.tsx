import React, { useContext } from 'react'
import { mixCSSObjects } from '../style/cssParser'
import { BaseUIDiv, DivProps } from './Div'
import cache from 'utils/functions/functionFactory/cache'
import cssDefaults from 'baseUI/settings/cssDefaults'
import { CSSObject } from '@emotion/react'
import { AppSettings, useAppSettings } from './AppSettings'

export interface CaptionProps extends DivProps {
  /**
   * @cssProps
   */
  align?: 'left' | 'center' | 'right'
}

/**
 * @BaseUIComponent
 */
export default function Caption({ align, ...restProps }: CaptionProps) {
  const { baseUICSS } = useAppSettings()
  return (
    <BaseUIDiv {...restProps} _css={getCSS({ align }, baseUICSS?.Caption)}></BaseUIDiv>
  )
}

export interface CaptionDetailCSS {
  captionTextColor?: CSSObject['color']
}

const getCSS = cache(({ align }: CaptionProps, cssSetting?: CaptionDetailCSS) =>
  mixCSSObjects(
    {
      fontSize: '0.8em',
      color: cssSetting?.captionTextColor ?? cssDefaults.grayText
    },
    align === 'left' && { textAlign: 'left' },
    align === 'center' && { textAlign: 'center' },
    align === 'right' && { textAlign: 'right' }
  )
)
