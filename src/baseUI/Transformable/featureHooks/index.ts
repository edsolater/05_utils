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

export interface FeaturesProps extends ScaleFeatureProps, FeatureProps {}
export const attachFeatures = (el, props) => {
  scaleFeatureCallback(el, props) // 缩放（不会重排）元素块
}
export const featureProps = [...moveFeatureProps, ...scaleFeatureProps, ...resizeFeatureProps]
export const featureCss = (props) => [
  scaleFeatureStyle(props),
]
