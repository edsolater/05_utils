import { MoveFeatureProps, moveFeatureCallback, moveFeatureProps, moveFeatureStyle } from './move'
import {
  ScaleFeatureProps,
  scaleFeatureCallback,
  scaleFeatureProps,
  scaleFeatureStyle
} from './scale'
import {
  ResizeFeatureProps,
  useFeatureResize,
  resizeFeatureProps,
  resizeFeatureStyle
} from './resize'

export interface FeaturesProps extends MoveFeatureProps, ScaleFeatureProps, ResizeFeatureProps {}
export const attachFeatures = (el, props) => {
  moveFeatureCallback(el, props) // 拖拽元素块
  scaleFeatureCallback(el, props) // 缩放（不会重排）元素块
}
export const featureProps = [...moveFeatureProps, ...scaleFeatureProps, ...resizeFeatureProps]
export const featureCss = (props) => [
  moveFeatureStyle(props),
  scaleFeatureStyle(props),
  resizeFeatureStyle(props)
]
export const useFeature = (el, props) => {
  return [useFeatureResize(el, props)]
}
