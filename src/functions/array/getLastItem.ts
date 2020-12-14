/**
 * (纯函数)
 * 取数组中的末项
 * @param arr 目标数组
 */
export default function getLastItem<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[arr.length - 1] : undefined
}
