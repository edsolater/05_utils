import areLengthEqual from './areLengthEqual'

/**
 * 判断两个数组是否具有相同（浅比较）
 * @param val1 一个值
 * @param val2 另一个值
 * @example
 * areEqualArray([1, 2], [1, 2]) // true
 */
export default function areEqualArray(val1: unknown[], val2: unknown[]) {
  if (!areLengthEqual(val1, val2))
    return false
  return val1.every((i, idx) => i == val2[idx])
}
