import { useMemo } from 'react'
import { mixCSSObjects } from 'style/cssParser'

// 声明组件有哪些props是纯粹改变外观的
export interface RowBoxStyleProps {
  /**
   * "横"盒子空隙的大小
   */
  gapSize?: 'small' | 'medium' | 'large'
  noStratch?: boolean
}

// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useRowBoxStyle = ({ gapSize = 'medium', noStratch }: RowBoxStyleProps) => {
  const coreCss = useMemo(
    () =>
      mixCSSObjects(
        { display: 'flex' },
        gapSize === 'small' && { gap: 4 },
        gapSize === 'medium' && { gap: 8 },
        gapSize === 'large' && { gap: 16 },
        noStratch && { alignItems: 'center' }
      ),
    [gapSize, noStratch]
  )
  return { coreCss }
}
