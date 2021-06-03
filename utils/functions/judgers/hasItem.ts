import isItemOf from './isOneOf'

export default function hasItem<T>(arr: T[], item: T) {
  return isItemOf(item, arr)
}
