import { useMemo } from 'react'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { mix } from 'style/cssParser'
import { toPx } from 'style/cssUnits'
import { cssValues } from 'style/cssValue'

// 声明组件有哪些props是纯粹改变外观的
export interface FeatureProps {
  /**
   * CSS: 卡片的颜色
   */
  color?: string
  /**
   * CSS: 卡片的背景图片（background能接收即可）
   */
  bgImg?: string
  /**
   * CSS: 卡片的渐变图片
   */
  gradient?: string
  /**
   * CSS
   */
  width?: number | string
  /**
   * CSS
   */
  height?: number | string
  /**
   * CSS
   */
  borderRadius?: 'small' | 'middle' | 'large'
}

// 表明具体有哪些props是纯粹改变外观的（JS代码声明，也便于提取相关属性）
export const featureProps: (keyof FeatureProps)[] = ['bgImg', 'color', 'borderRadius']

// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useFeature = ({
  color,
  bgImg,
  gradient,
  borderRadius,
  width,
  height
}: FeatureProps) => {
  const css = () =>
    mix({
      width: cssVar('--card-width', width ?? 'unset'),
      height: cssVar('--card-width', height ?? 'unset'),
      borderRadius: borderRadius === 'small' ? 4 : borderRadius === 'large' ? 32 : 8,
      boxShadow: cssValues.smoothShadow,
      background: bgImg ? `url(${bgImg}) center / cover` : gradient,
      backgroundColor: color
    })

  return { css }
}