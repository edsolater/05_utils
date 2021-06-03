/**
 * 检测是否是布尔值
 * @param val 目标值
 */
export default function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}
