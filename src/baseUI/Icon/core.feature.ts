import { useMemo } from 'react'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { mix } from 'style/cssParser'
import { toPx } from 'style/cssUnits'

//
/* ----------------------------- CONFIG 配置项 --------------------------------------------- */
//

const iconFileBasePath = '/icons' //CONFIG 配置项
const iconFileType = 'svg' //CONFIG 配置项
type AllIconNames = '' //CONFIG 配置项

//
/* ----------------------------- 类型申明 --------------------------------------------- */
//

export interface FeatureProps {
  /**icon名字 */
  name?: AllIconNames | (string & {})
}

//
/* ----------------------------- 用到的props --------------------------------------------- */
//

export const featureProps: (keyof FeatureProps)[] = ['name']

//
/* ----------------------------- 具体实现 --------------------------------------------- */
//
export const useFeature = ({ name }: FeatureProps) => {
  const src = `${iconFileBasePath}/${name}.${iconFileType}`
  return { src, name }
}
