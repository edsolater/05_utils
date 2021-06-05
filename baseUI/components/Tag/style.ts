import { useMemo } from 'react'
import cssColor from '../__config/cssColor'
import { mixCSSObjects } from '../../style/cssParser'
import { ICSS } from '../../style/ICSS'

export interface TagStyleProps {
  /**
   * CSS: 尺寸大小
   */
  cssSize?:'small' | 'medium' | 'large'
  /**
   * CSS：TagIcon节点
   */
  cssTagCloseIcon?: ICSS
}

// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useTagStyle = ({ cssTagCloseIcon }: TagStyleProps) => {
  const coreCss = useMemo(
    () =>
      mixCSSObjects({
        paddingLeft: '8px',
        paddingRight: '8px',
        display: 'inline-flex',
        alignItems: 'center',
        background: cssColor.lightgrey,
        borderRadius: '4px'
      }),
    []
  )

  const tagCloseIconCss = useMemo(() => mixCSSObjects(cssTagCloseIcon, {}), [cssTagCloseIcon])
  const tagCloseIconColor = cssColor.darkText
  return { coreCss, tagCloseIconCss, tagCloseIconColor }
}