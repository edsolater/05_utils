import { mixCSSObjects } from '../../style/cssParser'

// 声明组件有哪些props是纯粹改变外观的
export interface ImageStyleProps {}

// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useImageStyle = ({}: ImageStyleProps) => {
  const coreCss = mixCSSObjects()
  return { coreCss }
}
