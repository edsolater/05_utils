import merge from 'utils/array/merge'
import { attachClick, ClickProps, clickProps } from './click'
import { attachHover, hoverProps, HoverProps } from './hover'

export interface FeaturesProps extends HoverProps, ClickProps {}
export const featureProps = merge(hoverProps, clickProps)
export const attachFeatures = (el: HTMLDivElement, props: FeaturesProps) => {
  attachHover(el, props) // JS检测hover的交互
  attachClick(el, props) // JS检测hover的交互
}
