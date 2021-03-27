import { cssVar } from 'style/cssFunctions'
import { mix } from 'style/cssMixins'

// 声明组件有哪些props是纯粹改变外观的
export interface CaptionAppearanceProps {
  align?: 'left' | 'center' | 'right'
}

// 表明具体有哪些props是纯粹改变外观的（JS代码声明，也便于提取相关属性）
export const captionStylePropNames: (keyof CaptionAppearanceProps)[] = ['align']

// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const cssCaptionAppearance = ({ align = 'left' }: CaptionAppearanceProps) =>
  mix(
    { fontSize: '0.8em', color: cssVar('--caption-text-color', 'hsl(0deg 0% 20% / 70%)'/* TODO: 在model目录下，自己写个颜色生成器以便管理 */) },
    align === 'left' && { textAlign: 'left' },
    align === 'center' && { textAlign: 'center' },
    align === 'right' && { textAlign: 'right' }
  )
