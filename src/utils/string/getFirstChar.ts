/**
 * (纯函数)
 * 取字符串的第一个字符
 * @param str 目标字符串
 */
export default function getFirstChar(str: string): string {
  return str[0] ?? ''
}
