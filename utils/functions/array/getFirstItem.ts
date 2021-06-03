/**
 * (纯函数)
 * 获取数组中的第一项(为了与getLastItem保持对称性)
 * @param arr 目标数组
 */
export default function getFirstItem<T>(arr: T[]): T | undefined {
  return arr[0] 
}
