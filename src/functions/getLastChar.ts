/**
 * 纯函数
 * 取字符串的最后一个字符
 */
export default function getLastChar(target: string): string {
  return target[target.length - 1] ?? ''
}
