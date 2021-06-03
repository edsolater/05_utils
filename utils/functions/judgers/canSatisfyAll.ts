/**
 * 判断值是否满足接下来的一堆函数
 * （也可用一堆`&&`代替）
 * @param val 测试目标
 * @param judgers 测试函数们
 * @todo 这还应该是个复杂typeGard
 * 
 * @example
 * canSatisfyAll({}, isObject) // true
 */
export default function canSatisfyAll<T>(val: T, ...judgers: ((val: T) => boolean)[]) {
  return judgers.every(f => f(val))
}
