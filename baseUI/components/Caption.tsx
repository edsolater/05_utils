import React from 'react'
import { mixCSSObjects } from '../style/cssParser'
import { BaseUIDiv, divProps, DivProps } from './Div'
import cache from 'utils/functions/functionFactory/cache'
import cssDefaults from 'baseUI/settings/cssDefaults'
import { CSSObject } from '@emotion/react'
import { useAppSettings } from './AppSettings'
import addDefault from 'utils/functions/magic/addDefault'
import pick from 'utils/functions/object/pick'

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

const getCSS = cache((_props: CaptionCSSProps, _cssSetting: CaptionDetailCSS) => {
  const props = addDefault(_props, { align: 'left' })
  const cssSetting = addDefault(_cssSetting, { captionTextColor: cssDefaults.grayText })
  return mixCSSObjects(
    {
      fontSize: '0.8em',
      color: cssSetting.captionTextColor
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
  const { globalProps: baseUICSS } = useAppSettings()
  return <BaseUIDiv {...pick(props, divProps)} _css={getCSS(props, baseUICSS?.Caption ?? {})} />
}
