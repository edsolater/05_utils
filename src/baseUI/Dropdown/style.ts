import { useMemo } from 'react'
import { mix } from 'style/cssParser'
import { ICSS } from 'style/ICSS'

export interface DropdownStyleProps {
  /**
   * CSS：DropdownIcon节点
   */
  cssDropdownCard?: ICSS
}

// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useDropdownStyle = ({ cssDropdownCard }: DropdownStyleProps) => {
  const coreCss = useMemo(
    () =>
      mix({
        position: 'relative'
      }),
    []
  )

  const dropdownCardCss = useMemo(
    () =>
      mix(cssDropdownCard, {
        position: 'absolute',
        top: 'calc(100% + 8px)'
      }),
    [cssDropdownCard]
  )
  return { coreCss, dropdownCardCss }
}
