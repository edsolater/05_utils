import isItemOf from './isIn'

export default function hasKey<T extends object>(obj: T, key: keyof T) {
  //@ts-ignore
  return isItemOf(key, Object.keys(obj))
}
