import { isFunction } from '.'

/**
 * (纯函数)
 * 新创建一个有初始长度的数组，默认空值为undefined
 * @param length 数组长度
 * @param fill 空位置上的值，默认undefined
 * @example
 * createArray(3) => [undefined, undefined, undefined]
 * createArray(3, 'ha') => ['ha', 'ha', 'ha']
 * createArray(3, i => i) => [0, 1, 2]
 */
export default function createArray<T = undefined>(
  length: number,
  fill: T | ((idx: number) => T)
): T[] {
  if (isFunction(fill)) {
    // @ts-ignore
    return Array.from({ length }, (_, i) => fill(i))
  } else {
    // @ts-ignore
    return Array.from({ length }, () => fill)
  }
}
