import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureAppearance,
  featureProps as featureAppearanceProps,
  FeatureProps as FeatureAppearanceProps
} from './appearance.feature'
import omit from 'utils/object/omit'

//
/* ----------------------------- CONFIG 配置项 --------------------------------------------- */
//
type AllCardNames = '' //CONFIG 配置项

//
/* ----------------------------- PROPS props类型声明 --------------------------------------------- */
//

export interface CardProps extends DivProps, CardCoreProp, FeatureAppearanceProps {}
export interface CardCoreProp {
  /**card名字 */
  name?: AllCardNames | (string & {})
}
export const cardCoreProps: (keyof CardCoreProp)[] = ['name']

//
/* ----------------------------- 具体实现 --------------------------------------------- */
//

const Card = (props: CardProps) => {
  const restProps = omit(props, [...cardCoreProps, ...featureAppearanceProps])
  const { css: appearanceCss } = useFeatureAppearance(props)
  return <Div {...restProps} css={mix(appearanceCss, props.css)}></Div>
}

export default Card
