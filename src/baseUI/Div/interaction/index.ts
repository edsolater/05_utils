import { attachClick, ClickProps } from './clickable'
import { attachHover, HoverProps } from './hoverable'

export interface FeaturesProps extends HoverProps, ClickProps {}
export const attachFeatures = (el: HTMLDivElement, props: FeaturesProps) => {
  attachHover(el, props) // JS检测hover的交互
  attachClick(el, props) // JS检测hover的交互
}
