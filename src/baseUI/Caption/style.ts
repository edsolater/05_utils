import { cssVar } from 'style/cssFunctions'
import { mix } from 'style/cssParser'

// 声明组件有哪些props是纯粹改变外观的
export interface CaptionStyleProps {
  align?: 'left' | 'center' | 'right'
}


// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useCaptionStyle = ({ align = 'left' }: CaptionStyleProps) => {
  const coreCss = mix(
    {
      fontSize: '0.8em',
      color: cssVar(
        '--caption-text-color',
        'hsl(0deg 0% 20% / 70%)' /* TODO: 在model目录下，自己写个颜色生成器以便管理 */
      )
    },
    align === 'left' && { textAlign: 'left' },
    align === 'center' && { textAlign: 'center' },
    align === 'right' && { textAlign: 'right' }
  )
  return { coreCss }
}
