/**
 * (纯函数)
 * 取字符串的最后一个字符
 * @param str 目标字符串
 */
export default function getLastChar(str: string): string {
  return str[str.length - 1] ?? ''
}
