import { useMemo } from 'react'
import { cssVar } from 'style/cssFunctions'
import { mix } from 'style/cssParser'
import { cssValues } from 'style/cssValue'

// 声明组件有哪些props是纯粹改变外观的
export interface CardStyleProps {
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

// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useCardStyle = ({
  color,
  bgImg,
  gradient,
  borderRadius,
  width,
  height
}: CardStyleProps) => {
  const coreCss = useMemo(
    () =>
      mix({
        width: cssVar('--card-width', width ?? 'unset'),
        height: cssVar('--card-width', height ?? 'unset'),
        borderRadius: borderRadius === 'small' ? 4 : borderRadius === 'large' ? 32 : 8,
        boxShadow: cssValues.smoothShadow,
        background: bgImg ? `url(${bgImg}) center / cover` : gradient,
        backgroundColor: color
      }),
    [color, bgImg, gradient, borderRadius, width, height]
  )

  return { coreCss }
}
