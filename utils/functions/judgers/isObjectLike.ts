/**
 * 判断是否是个对象/数组
 * (函数被认为非对象)
 * @param val 目标值
 */
export default function isObjectLike(val: unknown): val is object {
  return typeof val === 'object' && val !== null
}
