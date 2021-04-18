//
/* ----------------------------- CONFIG 配置项 --------------------------------------------- */
//

const inputFileBasePath = '/inputs' //CONFIG 配置项
const inputFileType = 'svg' //CONFIG 配置项
type AllInputNames = '' //CONFIG 配置项

//
/* ----------------------------- 类型申明 --------------------------------------------- */
//

export interface FeatureProps {
  /**
   * input名字
   */
  name?: AllInputNames | (string & {})
  /**
   * color是否设定，决定了是否启用Img标签
   */
  color?: string
}

//
/* ----------------------------- 用到的props --------------------------------------------- */
//

export const featureProps: (keyof FeatureProps)[] = ['name', 'color']

//
/* ----------------------------- 具体实现 --------------------------------------------- */
//
export const useFeature = ({ name, color }: FeatureProps) => {
  const src = `${inputFileBasePath}/${name}.${inputFileType}`
  return { src, name,sholdUseRaw: !color }
}
