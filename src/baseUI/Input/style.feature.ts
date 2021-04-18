import { useMemo } from 'react'
import cssColor from 'style/cssColor'
import { cssVar } from 'style/cssFunctions'
import { mix } from 'style/cssParser'

export interface FeatureProps {
  /**
   * CSS: 输入框颜色
   *
   * 对应于css variable : --input-focus-color
   */
  inputFocusColor?: string
  /**
   * CSS: 光标颜色
   *
   * 对应于css variable : --input-caret-color
   */
  inputCaretColor?: string
  /**
   * CSS: 输入框宽度
   * 默认10px宽
   *
   * 对应于css variable : --input-box-width
   */
  inputBoxWidth?: string
}

// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useFeature = ({
  inputFocusColor,
  inputCaretColor = inputFocusColor,
  inputBoxWidth
}: FeatureProps) => {
  const style = useMemo(
    () =>
      mix({
        cursor: 'text',
        border: `1px solid ${cssColor.whitesmoke}`,
        ':focus-within': {
          borderColor: inputFocusColor
        },
        padding: '4px 8px',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        width: cssVar('--input-box-width', inputBoxWidth ?? '180px'),
        '& > .__input-icon': {
          flex: 'none'
        },
        '& > .__input-body': {
          cursor: 'inherit',
          flex: 1,
          background: 'transparent',
          caretColor: cssVar('--input-caret-color', inputCaretColor ?? 'unset'),
          outline: 'none',
          border: 'none'
        }
      }),
    [inputFocusColor]
  )
  return { style }
}
