/**
 * 判断两个值全等
 * @param value1 一个值
 * @param value2 另一个值
 */
export default function areSame(value1: any, value2: any): boolean {
  return Object.is(value1, value2)
}
