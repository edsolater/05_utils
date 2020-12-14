import notUndefined from '../judgers/notUndefined'
type NonUndefined<T> = T extends undefined ? never : T

/**
 * 删除数组的所有undefined项
 * @param arr 目标数组
 * @returns 清除undefined后的新数组
 * @example
 * discardArrayUndefined([42, 21, undefined, 50, 40, undefined, 9]) // [42, 21, 50, 40, 9]
 */
export default function discardArrayUndefined<T extends unknown>(arr: T[]): Array<NonUndefined<T>> {
  return arr.filter(notUndefined)
}
