import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureAppearance,
  featureProps as featureAppearanceProps,
  FeatureProps as FeatureAppearanceProps
} from './appearance.feature'
import omit from 'utils/object/omit'
import Img from 'baseUI/Img'

//
/* ----------------------------- CONFIG 配置项 --------------------------------------------- */
//

const iconFileBasePath = '/icons' //CONFIG 配置项
const iconFileType = 'svg' //CONFIG 配置项
type AllIconNames = '' //CONFIG 配置项

//
/* ----------------------------- PROPS props类型声明 --------------------------------------------- */
//

export interface IconProps extends DivProps, IconCoreProp, FeatureAppearanceProps {}
export interface IconCoreProp {
  /**icon名字 */
  name?: AllIconNames | (string & {})
}
export const iconCoreProps: (keyof IconCoreProp)[] = ['name']

//
/* ----------------------------- 具体实现 --------------------------------------------- */
//

const Icon = (props: IconProps) => {
  const restProps = omit(props, [...iconCoreProps, ...featureAppearanceProps])
  const { css: appearanceCss, sholdUseRaw } = useFeatureAppearance(props, {
    src: `${iconFileBasePath}/${props.name}.${iconFileType}`
  })
  return (
    <Div {...restProps} css={mix(appearanceCss, props.css)}>
      {sholdUseRaw && (
        <Img src={`${iconFileBasePath}/${props.name}.${iconFileType}`} alt={props.name} />
      )}
    </Div>
  )
}

export default Icon
