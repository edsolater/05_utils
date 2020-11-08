import isIn from './isIn'

export default function hasKey<T extends object>(obj: T, key: keyof T) {
  //@ts-ignore
  return isIn(key, Object.keys(obj))
}
