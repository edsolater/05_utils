import isIn from './isIn'

export default function hasItem<T>(arr: T[], item: T) {
  return isIn(item, arr)
}
