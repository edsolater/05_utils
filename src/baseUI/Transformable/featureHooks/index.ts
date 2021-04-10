import { MoveFeatureProps, moveFeatureCallback, moveFeatureProps, moveFeatureStyle } from './move'
import {
  ScaleFeatureProps,
  scaleFeatureCallback,
  scaleFeatureProps,
  scaleFeatureStyle
} from './scale'
import {
  FeatureProps,
  featureProps as resizeFeatureProps,
} from './useFeatureResize'

export interface FeaturesProps extends MoveFeatureProps, ScaleFeatureProps, FeatureProps {}
export const attachFeatures = (el, props) => {
  moveFeatureCallback(el, props) // 拖拽元素块
  scaleFeatureCallback(el, props) // 缩放（不会重排）元素块
}
export const featureProps = [...moveFeatureProps, ...scaleFeatureProps, ...resizeFeatureProps]
export const featureCss = (props) => [
  moveFeatureStyle(props),
  scaleFeatureStyle(props),
]
