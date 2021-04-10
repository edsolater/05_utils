import { attachClick, ClickProps } from './click'
import { attachHover, HoverProps } from './hover'

export interface FeaturesProps extends HoverProps, ClickProps {}
export const attachFeatures = (el: HTMLDivElement, props: FeaturesProps) => {
  attachHover(el, props) // JS检测hover的交互
  attachClick(el, props) // JS检测hover的交互
}
