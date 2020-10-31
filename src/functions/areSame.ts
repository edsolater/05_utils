/**
 * 判断两个值全等
 * @param val1 一个值
 * @param val2 另一个值
 */
export default function areSame(val1: unknown, val2: unknown): boolean {
  return Object.is(val1, val2)
}
