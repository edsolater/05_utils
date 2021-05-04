import { CSSConfigContext } from 'baseUI/CSSConfigProvider'
import { useContext, useMemo } from 'react'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { mixCSSObjects } from 'style/cssParser'
import merge from 'utils/object/merge'

//IDEA: 正常情况下，需要更改的只有颜色，因为能过渡处理

// 声明组件有哪些props是纯粹改变外观的
export interface BaseUiStyleProps {
  /**
   * 按钮元素的权重
   * 默认：border（空心按钮）
   */
  type?: 'fill' | 'border' | 'text'
  /**
   * 按钮的大小
   */
  size?: 'small' | 'middle' | 'large'
}
export type BaseUiCSSVariableNames =
  | '--baseUi-background-color'
  | '--baseUi-text-color'
  | '--baseUi-border-color'
/**
 * 只配置尺寸信息等频繁自定义的项目
 */
export type BaseUiDefaultCSS = Partial<typeof baseUiDefaultCSS>
const baseUiDefaultCSS = {
  borderWidth: '1px',
  borderLineOpacity: 0.3,
  small: {
    padding: '2px 8px',
    fontSize: '14px',
    borderRadius: '2px'
  },
  middle: {
    padding: '6px 14px',
    fontSize: '14px',
    borderRadius: '4px'
  },
  large: {
    padding: '10px 16px',
    fontSize: '16px',
    borderRadius: '6px'
  }
}

// FIXME: 因为是hooks，不同的<BaseUi>组件需要都需要计算，这是没有必要的。
// IDEA: 需要在这个文件中，做一个Cache
export function useBaseUiStyle({ size = 'middle', type = 'border' }: BaseUiStyleProps) {
  const { baseUi: baseUiCustomCSS = {} } = useContext(CSSConfigContext)
  const baseUiCSS = merge(baseUiDefaultCSS, baseUiCustomCSS)
  const coreCss = useMemo(
    () =>
      mixCSSObjects(
        {
          style: 'none',
          borderWidth: 0,
          cursor: 'pointer',
          userSelect: 'none',
          width: 'max-content',
          boxSizing: 'border-box'
        },
        size === 'small' && {
          padding: baseUiCSS.small.padding,
          fontSize: baseUiCSS.small.fontSize,
          borderRadius: baseUiCSS.small.borderRadius
        },
        size === 'middle' && {
          padding: baseUiCSS.middle.padding,
          fontSize: baseUiCSS.middle.fontSize,
          borderRadius: baseUiCSS.middle.borderRadius
        },
        size === 'large' && {
          padding: baseUiCSS.large.padding,
          fontSize: baseUiCSS.large.fontSize,
          borderRadius: baseUiCSS.large.borderRadius
        },
        type === 'fill' && {
          color: cssVar('--baseUi-text-color', 'white'),
          backgroundColor: cssVar('--baseUi-background-color', '#666'),
          ':hover': { filter: cssBrightness(1.4) },
          ':active': { filter: cssBrightness(0.8) }
        },
        type === 'border' && {
          position: 'relative',
          backgroundColor: 'transparent',
          color: cssVar('--baseUi-text-color'),
          '::before': {
            content: "''",
            position: 'absolute',
            inset: '0',
            borderRadius: 'inherit',
            borderWidth: baseUiCSS.borderWidth,
            borderStyle: 'solid',
            borderColor: cssVar('--baseUi-border-color', 'currentcolor'),
            opacity: baseUiCSS.borderLineOpacity,
            color: 'inherit'
          }
        },
        type === 'text' && {
          color: cssVar('--baseUi-text-color'),
          backgroundColor: 'transparent'
        }
      ),
    [baseUiCustomCSS]
  )
  return { coreCss }
}
