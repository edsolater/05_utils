import { mixCSSObjects } from '../../style/cssParser'
import cache from 'utils/functions/functionFactory/cache'
import { ViewControllerProps } from '.'
/**
 * 声明组件有哪些props是纯粹改变外观的
 */
export interface CssProps {
  /**
   * 是否可见，隐藏则display为0
   * @default true
   */
  hidden?: boolean
}

export const getCSS = cache((props: ViewControllerProps) => {
  const { hidden = false } = props
  return mixCSSObjects(props.css, {
    display: 'contents',
    '> *': {
      opacity: hidden ? '0' : '1'
    }
  })
})