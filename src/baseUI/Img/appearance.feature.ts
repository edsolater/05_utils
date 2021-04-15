import { cssBrightness, cssVar } from 'style/cssFunctions'
import { mix } from 'style/cssParser'
import { toPx } from 'style/cssUnits'

// 声明组件有哪些props是纯粹改变外观的
export interface FeatureProps {}

// 表明具体有哪些props是纯粹改变外观的（JS代码声明，也便于提取相关属性）
export const featureProps: (keyof FeatureProps)[] = []

//IDEA: 可能类似于Vue2的固定名称的对象是个好办法
// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useFeature = ({}: FeatureProps) => {
  const css = mix()
  return { css }
}
