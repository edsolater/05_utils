/**
 * 纯函数
 * 判断数组/字符串是否为空
 * @param target 目标数组
 */
export default function isEmpty(target: Iterable<any>): boolean {
  return Array.from(target).length === 0
}