import { useMemo } from 'react'
import cssColor from 'style/cssColor'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { mix } from 'style/cssParser'
import { toPx } from 'style/cssUnits'

export interface FeatureProps {
  /**
   * CSS: 输入框颜色
   * 框边聚焦时框色、光标色
   *
   * 对应于css variable : --input-focus-color
   */
  inputFocusColor?: string
}

// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useFeature = ({ inputFocusColor }: FeatureProps) => {
  const style = useMemo(
    () =>
      mix({
        border: `1px solid ${cssColor.whitesmoke}`,
        '& > .__input-body': {
          padding: '4px 8px',
          cursor: 'text',
          caretColor: cssVar('--input-focus-color', inputFocusColor ?? 'unset'),
          border: 'none'
        }
      }),
    [inputFocusColor]
  )
  return { style }
}
