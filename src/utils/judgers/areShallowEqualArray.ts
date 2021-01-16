import areLengthEqual from './areLengthEqual'

/**
 * 判断两个数组是否具有相同（浅比较）
 * @param arr1 被比较
 * @param arr2 期望目标
 * @example
 * areEqualArray([1, 2], [1, 2]) // true
 */
export default function areShallowEqualArray(arr1: unknown[], arr2: unknown[]) {
  if (!areLengthEqual(arr1, arr2))
    return false
  return arr1.every((i, idx) => i === arr2[idx])
}
