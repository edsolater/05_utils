/**
 * (会更改目标对象)
 * 清空整个数组，数组的长度变为0
 * @param arr 目标数组
 */
export default function eraseTotalArray<T extends any[]>(arr: T): T {
  arr.splice(0,arr.length)
  return arr
}
