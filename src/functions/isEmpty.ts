/**
 * (纯函数)
 * 
 * 判断数组/字符串是否为空
 * 
 * @param target 目标数组
 * @example
 * isEmpty([]) // true
 * isEmpty([1]) // false
 */
export default function isEmpty(target: any[] | string): boolean {
  return Array.from(target).length === 0
}