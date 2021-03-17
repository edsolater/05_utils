import { attachHover, HoverProps } from './hoverable'

export interface FeaturesProps extends HoverProps {}
export const attachFeatures = (el: HTMLElement, props: FeaturesProps) => {
  attachHover(el, props) // JS检测hover的交互
}
