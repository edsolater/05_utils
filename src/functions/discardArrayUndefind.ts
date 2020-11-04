import isUndefined from './isUndefined'

type NonUndefined<T> = T extends undefined ? never : T

/**
 * 删除数组的所有undefined项
 * @param arr 目标数组
 * @returns 清除undefined后的新数组
 * @example
 * discardArrayUndefind([42, 21, undefined, 50, 40, undefined, 9]) // [42, 21, 50, 40, 9]
 */
export default function discardArrayUndefind<T extends unknown>(arr: T[]): Array<NonUndefined<T>> {
  //@ts-expect-error
  return arr.filter(isUndefined)
}
