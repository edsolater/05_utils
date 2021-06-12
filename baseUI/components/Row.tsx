import React from 'react'
import { BaseUIDiv, divProps, DivProps } from './Div'
import { mixCSSObjects } from '../style/cssParser'
import pick from 'utils/functions/object/pick'
import cache from 'utils/functions/functionFactory/cache'

export interface RowProps extends DivProps, RowCSSProps {}

interface RowCSSProps {
  /**
   * "横"盒子空隙的大小
   */
  gapSize?: 'small' | 'medium' | 'large'
  noStratch?: boolean
}

const getCSS = cache((props: RowCSSProps) =>
  mixCSSObjects(
    { display: 'flex' },
    props.gapSize === 'small' && { gap: 4 },
    props.gapSize === 'medium' && { gap: 8 },
    props.gapSize === 'large' && { gap: 16 },
    props.noStratch && { alignItems: 'center' }
  )
)
/**
 * @BaseUIComponent
 *
 * 将子元素显示在一行，相当于flexbox
 */
const Row = (props: RowProps) => {
  return <BaseUIDiv {...pick(props, divProps)} css={getCSS(props)}></BaseUIDiv>
}

export default Row
