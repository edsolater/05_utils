import mergeProps, { AnyProp } from './mergeProps'

// NOTE: seems not necessary. But, it can improve code's readability
export default function addDefaultProps<T extends AnyProp>(props: T, defaultProps: Partial<T>): T {
  return mergeProps(defaultProps, props)
}
