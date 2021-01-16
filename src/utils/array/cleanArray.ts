import isNullish from '../judgers/isNullish'

/**
 * 删除数组的所有undefined/null项
 * @param arr 目标数组
 * @returns 清除undefined/null后的新数组
 * @example
 * cleanArray([42, 21, null,,, 50, 40, undefined, 9]) // [42, 21, 50, 40, 9]
 */
export default function cleanArray<T extends unknown>(arr: T[]): Array<NonNullable<T>> {
  //@ts-expect-error
  return arr.filter(isNullish)
}
