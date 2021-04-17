import { useMemo } from 'react'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { mix } from 'style/cssParser'
import { toPx } from 'style/cssUnits'

// 声明组件有哪些props是纯粹改变外观的
export interface FeatureProps {
  /**
   * 代表颜色的CSS色值（只要是background属性能接受的值）
   * 不设定，使用图标原本的颜色
   */
  color?: string
  /**
   * 代表颜色的CSS色值（只要是background属性能接受的值）
   */
  hoverColor?: string
  /**图标可点击 */
  clickable?: boolean
}

// 表明具体有哪些props是纯粹改变外观的（JS代码声明，也便于提取相关属性）
export const featureProps: (keyof FeatureProps)[] = ['color', 'hoverColor', 'clickable']

// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useFeature = (
  { color, hoverColor, clickable }: FeatureProps,
  { src }: { src: string }
) => {
  const css = () =>
    mix({
      width: cssVar('--dropdown-width', '1.5rem'),
      height: cssVar('--dropdown-width', '1.5rem'),
      display: 'inline-grid',
      placeItems: 'center',
      cursor: clickable && 'pointer',
      mask: color ?? hoverColor ? `url(${src})  0% 0% / contain no-repeat` : '',
      background: cssVar('--dropdown-color', color),
      transition: 'background 200ms',
      '&:hover': {
        background: cssVar('--dropdown-hover-color', hoverColor ?? color)
      },
      '& > .__dropdown-img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }
    })

  return { css, sholdUseRaw: !color }
}
