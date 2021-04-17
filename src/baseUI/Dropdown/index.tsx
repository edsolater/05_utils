/**
 * Dropdown并不需要Portal，因为需要“长”在内容里
 * 而 <Modal/> 组件是必须脱离有限制的节点，必须用Protal
 */
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

const dropdownFileBasePath = '/dropdowns' //CONFIG 配置项
const dropdownFileType = 'svg' //CONFIG 配置项
type AllDropdownNames = '' //CONFIG 配置项

//
/* ----------------------------- PROPS props类型声明 --------------------------------------------- */
//

export interface DropdownProps extends DivProps, DropdownCoreProp, FeatureAppearanceProps {}
export interface DropdownCoreProp {
  /**dropdown名字 */
  name?: AllDropdownNames | (string & {})
}
export const dropdownCoreProps: (keyof DropdownCoreProp)[] = ['name']

//
/* ----------------------------- 具体实现 --------------------------------------------- */
//

const Dropdown = (props: DropdownProps) => {
  const restProps = omit(props, [...dropdownCoreProps, ...featureAppearanceProps])
  const src = `${dropdownFileBasePath}/${props.name}.${dropdownFileType}`
  const { css: appearanceCss, sholdUseRaw } = useFeatureAppearance(props, { src })
  return (
    <Div {...restProps} css={mix(appearanceCss, props.css)}>
      {sholdUseRaw && <Img src={src} alt={props.name} />}
    </Div>
  )
}

export default Dropdown

// TODO：怎么插入组件的skin呢？（要把skin做成可配置化的）（为了不同项目的组件可配置性，不然就用cssVariable吧，做到组件穿透？）（不行，CSS Variable只能传递CSS， 还要传递Props）
