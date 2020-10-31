import isNull from './isNull'
import isUndefined from './isUndefined'

export default function isNullish(val: unknown): val is undefined | null {
  return isNull(val) || isUndefined(val)
}
