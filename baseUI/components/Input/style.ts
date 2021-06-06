import { useMemo } from 'react'
import cssColor from '../../style/cssColor'
import { cssVar } from '../../style/cssFunctions'
import { cssMixins } from '../../style/cssMixins'
import { mixCSSObjects } from '../../style/cssParser'
import { ICSS } from '../../style/ICSS'

export interface InputStyleProps {
  /**
   * CSS：根节点
   */
  css?: ICSS

  /**
   * CSS：InputIcon节点
   */
  cssInputIcon?: ICSS

  /**
   * CSS：InputBody节点
   */
  cssInputBody?: ICSS

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
export const useInputStyle = (
  {
    css,
    cssInputIcon,
    cssInputBody,
    inputFocusColor,
    inputCaretColor = inputFocusColor,
    inputBoxWidth
  }: InputStyleProps,
  {
    isTextarea
  }: {
    /**
     * 呈现为textarea
     */
    isTextarea: Boolean
  }
) => {
  const coreCss = useMemo(
    () =>
      mixCSSObjects(
        {
          cursor: 'text',
          border: `1px solid ${cssColor.whitesmoke}`,
          ':focus-within': {
            borderColor: inputFocusColor
          },
          padding: '4px 8px',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          width: cssVar('--input-box-width', inputBoxWidth)
        },
        css
      ),
    [css, inputFocusColor, inputBoxWidth]
  )

  const inputIconCss = useMemo(
    () =>
      mixCSSObjects(
        {
          flex: 'none'
        },
        cssInputIcon
      ),
    [cssInputIcon]
  )

  const inputBodyCss = useMemo(
    () =>
      mixCSSObjects(
        {
          cursor: 'inherit',
          flex: '1 0 auto',
          background: cssColor.transparent,
          caretColor: cssVar('--input-caret-color', inputCaretColor ?? 'unset'),
          outline: 'none',
          border: 'none'
        },
        isTextarea &&
          mixCSSObjects(cssMixins.noScrollbar, {
            resize: 'none'
          }),
        cssInputBody
      ),
    [cssInputBody]
  )
  const textareaModeCss = useMemo(() => mixCSSObjects(inputBodyCss, {}), [cssInputBody])
  return { coreCss, inputIconCss, inputBodyCss, textareaModeCss }
}
