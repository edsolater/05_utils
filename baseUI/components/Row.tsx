import React from 'react'
import { BaseUIDiv, divProps, DivProps } from './Div'
import { mixCSSObjects } from '../style/cssParser'
import pick from 'utils/functions/object/pick'
import cache from 'utils/functions/functionFactory/cache'
import { CSSPropertyValue } from 'baseUI/style/cssValue'
import { useAppSettings } from './AppSettings'
import mergeProps from 'baseUI/functions/mergeProps'
import addDefaultProps from 'baseUI/functions/addDefaultProps'

export interface RowProps extends DivProps {
  /**
   * @cssProps
   * "横"盒子空隙的大小
   */
  gapSize?: 'small' | 'medium' | 'large'

  /**@cssProps */
  noStratch?: boolean
}

export interface RowSprops extends RowProps {
  'gapSize--small'?: CSSPropertyValue<'gap'>
  'gapSize--medium'?: CSSPropertyValue<'gap'>
  'gapSize--large'?: CSSPropertyValue<'gap'>
}

const defaultSprops: RowSprops = {
  'gapSize--small': '4px',
  'gapSize--medium': '8px',
  'gapSize--large': '16px'
}

const getCSS = cache((sprops: RowSprops) =>
  mixCSSObjects(
    { display: 'flex' },
    sprops.gapSize === 'small' && { gap: sprops['gapSize--small'] },
    sprops.gapSize === 'medium' && { gap: sprops['gapSize--medium'] },
    sprops.gapSize === 'large' && { gap: sprops['gapSize--large'] },
    sprops.noStratch && { alignItems: 'center' }
  )
)
/**
 * @BaseUIComponent
 *
 * 将子元素显示在一行，相当于flexbox
 */
const Row = (props: RowProps) => {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Row, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)
  
  return <BaseUIDiv {...pick(sprops, divProps)} css={getCSS(sprops)}></BaseUIDiv>
}

export default Row
