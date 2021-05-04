import { CSSConfigContext } from '../CSSConfigProvider'
import { useContext, useMemo } from 'react'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { mixCSSObjects } from 'style/cssParser'
import merge from 'utils/object/merge'


// 声明组件有哪些props是纯粹改变外观的
export interface ButtonStyleProps {
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

//IDEA: 正常情况下，需要更改的只有颜色，因为能过渡处理
export type ButtonCSSVariableNames =
  | '--button-background-color'
  | '--button-text-color'
  | '--button-border-color'
/**
 * 只配置尺寸信息等频繁自定义的项目
 */
export type ButtonDefaultCSS = Partial<typeof buttonDefaultCSS>
const buttonDefaultCSS = {
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

// FIXME: 因为是hooks，不同的<Button>组件需要都需要计算，这是没有必要的。
// TODO: 需要在这个文件中，做一个 Cache， 做一个 cachedMerge 与 cachedMix
export function useButtonStyle({ size = 'middle', type = 'border' }: ButtonStyleProps) {
  const { button: buttonCustomCSS = {} } = useContext(CSSConfigContext)
  const buttonCSS = merge(buttonDefaultCSS, buttonCustomCSS)
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
          padding: buttonCSS.small.padding,
          fontSize: buttonCSS.small.fontSize,
          borderRadius: buttonCSS.small.borderRadius
        },
        size === 'middle' && {
          padding: buttonCSS.middle.padding,
          fontSize: buttonCSS.middle.fontSize,
          borderRadius: buttonCSS.middle.borderRadius
        },
        size === 'large' && {
          padding: buttonCSS.large.padding,
          fontSize: buttonCSS.large.fontSize,
          borderRadius: buttonCSS.large.borderRadius
        },
        type === 'fill' && {
          color: cssVar('--button-text-color', 'white'),
          backgroundColor: cssVar('--button-background-color', '#666'),
          ':hover': { filter: cssBrightness(1.4) },
          ':active': { filter: cssBrightness(0.8) }
        },
        type === 'border' && {
          position: 'relative',
          backgroundColor: 'transparent',
          color: cssVar('--button-text-color'),
          '::before': {
            content: "''",
            position: 'absolute',
            inset: '0',
            borderRadius: 'inherit',
            borderWidth: buttonCSS.borderWidth,
            borderStyle: 'solid',
            borderColor: cssVar('--button-border-color', 'currentcolor'),
            opacity: buttonCSS.borderLineOpacity,
            color: 'inherit'
          }
        },
        type === 'text' && {
          color: cssVar('--button-text-color'),
          backgroundColor: 'transparent'
        }
      ),
    [buttonCustomCSS]
  )
  return { coreCss }
}
