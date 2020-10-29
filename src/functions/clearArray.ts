/**
 * (会更改目标对象)
 * 清空整个数组，数组的长度变为0
 * @param target 目标数组
 * 
 */
export default function clearArray<T extends any[]>(target: T): T {
  target.splice(0,target.length)
  return target
}
