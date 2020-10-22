/**
 * mutated
 * 清空整个数组
 * @param target 目标数组
 */
export default function clearArray<T extends any[]>(target: T): T {
  target.splice(0,target.length)
  return target
}
