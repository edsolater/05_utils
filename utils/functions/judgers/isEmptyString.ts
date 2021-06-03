/**
 * 检测是否是空字符串
 * @param val 检测值
 */
export default function isEmptyString(val: unknown): val is '' {
  return val === ''
}
