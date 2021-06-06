import cssDefaults from "baseUI/settings/cssDefaults"
import { cssVar } from "baseUI/style/cssFunctions"
import { mixCSSObjects } from "baseUI/style/cssParser"

// 声明组件有哪些props是纯粹改变外观的
export interface CaptionStyleProps {
  align?: 'left' | 'center' | 'right'
}


// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const useCaptionStyle = ({ align = 'left' }: CaptionStyleProps) => {
  const coreCss = mixCSSObjects(
    {
      fontSize: '0.8em',
      color: cssVar(
        '--caption-text-color',
        cssDefaults.grayText
      )
    },
    align === 'left' && { textAlign: 'left' },
    align === 'center' && { textAlign: 'center' },
    align === 'right' && { textAlign: 'right' }
  )
  return { coreCss }
}
