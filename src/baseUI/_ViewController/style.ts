import { mixCSSObjects } from 'style/cssParser'
import cache from 'utils/functionFactory/cache'
import { ViewControllerProps } from '.'
import addDefault from 'utils/object/addDefault'
/**
 * 声明组件有哪些props是纯粹改变外观的
 */
export interface CssProps {
  /**
   * 是否可见，隐藏则display为0
   * @default true
   */
  show?: boolean
}
const defaultStyleProps: CssProps = {
  show: true
}



export const getCSS = cache(
  (props: ViewControllerProps) => {
    addDefault(props, defaultStyleProps)
    return mixCSSObjects(props.css, {
      display: 'contents',
      opacity: props.show ? '1' : '0'
    })
  }
)
