import { useMemo } from 'react'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { mixCSSObjects } from 'style/cssParser'

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

//IDEA: 正常情况下，需要更改的只有颜色和尺寸信息（程度信息），因为能过渡处理
export type ButtonCSSVariableNames =
  | '--button-background-color'
  | '--button-text-color'
  | '--button-border-color'
  | '--button-border-line-width'
  | '--button-border-line-opacity'
  | '--button-padding_small'
  | '--button-font-size_small'
  | '--button-border-radius_small'
  | '--button-padding_middle'
  | '--button-font-size_middle'
  | '--button-border-radius_middle'
  | '--button-padding_large'
  | '--button-font-size_large'
  | '--button-border-radius_large'

// FIXME: 因为是hooks，不同的<Button>组件需要都需要计算，这是没有必要的。
// TODO: 需要在这个文件中，做一个 Cache， 做一个 cachedMerge 与 cachedMix
export function useButtonStyle({ size = 'middle', type = 'border' }: ButtonStyleProps) {
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
          padding: cssVar('--button-padding_small', '2px 8px'),
          fontSize: cssVar('--button-font-size_small', '14px'),
          borderRadius: cssVar('--button-border-radius_small', '2px')
        },
        size === 'middle' && {
          padding: cssVar('--button-padding_middle', '2px 8px'),
          fontSize: cssVar('--button-font-size_middle', '14px'),
          borderRadius: cssVar('--button-border-radius_middle', '2px')
        },
        size === 'large' && {
          padding: cssVar('--button-padding_large', '2px 8px'),
          fontSize: cssVar('--button-font-size_large', '14px'),
          borderRadius: cssVar('--button-border-radius_large', '2px')
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
            borderWidth: cssVar('--button-border-line-width', '1px'),
            borderStyle: 'solid',
            borderColor: cssVar('--button-border-color', 'currentcolor'),
            opacity: cssVar('--button-border-line-opacity', '0.3'),
            color: 'inherit'
          }
        },
        type === 'text' && {
          color: cssVar('--button-text-color'),
          backgroundColor: 'transparent'
        }
      ),
    [size, type]
  )
  return { coreCss }
}
