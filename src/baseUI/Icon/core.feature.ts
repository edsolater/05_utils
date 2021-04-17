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
  /**
   * icon名字
   */
  name?: AllIconNames | (string & {})
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
  const src = `${iconFileBasePath}/${name}.${iconFileType}`
  return { src, name,sholdUseRaw: !color }
}
