import { useMemo } from 'react'
import cssColor from '../__config/cssColor'
import {  cssVar } from '../../style/cssFunctions'
import { mixCSSObjects } from '../../style/cssParser'

// 声明组件有哪些props是纯粹改变外观的
export interface IconStyleProps {
  /**
   * CSS: 代表颜色的CSS色值（只要是background属性能接受的值）
   * 不设定，使用图标原本的颜色
   */
  color?: string
  /**
   * CSS: 代表颜色的CSS色值（只要是background属性能接受的值）
   */
  hoverColor?: string
  /**
   * CSS: 图标可点击
   */
  clickable?: boolean
}
// TODO:是否有必要？
export const iconPropsDefault: IconStyleProps = {
  color: undefined,
  hoverColor: undefined,
  clickable: undefined
}

// 表明具体有哪些props是纯粹改变外观的（JS代码声明，也便于提取相关属性）
export const iconProps: (keyof IconStyleProps)[] = Object.keys(iconPropsDefault) as any

// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useIconStyle = (
  { color, hoverColor, clickable }: IconStyleProps,
  { src }: { src: string }
) => {
  const coreCss = useMemo(
    () =>
      mixCSSObjects({
        // TODO 常见的图标尺寸要查询： 24*24 48*48 等等
        width: cssVar('--icon-width', '1.5rem'),
        height: cssVar('--icon-width', '1.5rem'),
        cursor: clickable && 'pointer',
        position: 'relative',
        borderRadius: '2px',
        transition: 'background 200ms',
        ':hover': {
          background:cssColor.darkMaskLighter,
          filter: `brightness(0.4) grayscale(0.5)`
        },
        '::before': {
          content: "''",
          position: 'absolute',
          inset: '0',
          mask: color ?? hoverColor ? `url(${src})  0% 0% / contain no-repeat` : '',
          background: cssVar('--icon-color', color),
          transition: 'background 200ms',
          ':hover': {
            background: cssVar('--icon-hover-color', hoverColor ?? color)
          }
        }
      }),
    [color, hoverColor, clickable]
  )
  const iconImageCss = useMemo(
    () =>
      mixCSSObjects({
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }),
    []
  )
  return { coreCss, iconImageCss }
}
