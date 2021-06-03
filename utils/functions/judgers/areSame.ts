/**
 * 判断多个值（至少两个）全等
 * @param vals 要判断的值
 */
export default function areSame(...vals: unknown[]): boolean {
  if (vals.length < 2) return false
  for (let i = 1; i < vals.length; i++) {
    const pre = vals[i - 1]
    const cur = vals[i]
    if (!Object.is(pre, cur)) return false
  }
  return true
}
