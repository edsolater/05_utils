import React from 'react'
import { mixCSSObjects } from '../style/cssParser'
import { BaseUIDiv, DivProps } from './Div'
import cache from 'utils/functions/functionFactory/cache'
import cssDefaults from 'baseUI/settings/cssDefaults'
import { CSSObject } from '@emotion/react'
import { useAppSettings } from './AppSettings'
import addDefault from 'utils/functions/magic/addDefault'

export interface CaptionProps extends DivProps, CaptionCSSProps {}

interface CaptionCSSProps {
  /**
   * @default 'left
   */
  align?: 'left' | 'center' | 'right'
}

export interface CaptionDetailCSS {
  captionTextColor?: CSSObject['color']
}

const getCSS = cache((_props: CaptionCSSProps, cssSetting: CaptionDetailCSS) => {
  const props = addDefault(_props, { align: 'left' })
  return mixCSSObjects(
    {
      fontSize: '0.8em',
      color: cssSetting.captionTextColor ?? cssDefaults.grayText
    },
    props.align === 'left' && { textAlign: 'left' },
    props.align === 'center' && { textAlign: 'center' },
    props.align === 'right' && { textAlign: 'right' }
  )
})

/**
 * @BaseUIComponent
 */
export default function Caption(props: CaptionProps) {
  const { baseUICSS } = useAppSettings()
  return <BaseUIDiv {...props} _css={getCSS(props, baseUICSS?.Caption ?? {})} />
}
