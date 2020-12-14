import getType from '../core/getType'
/**
 * 检测值是否是个对象字面量
 * @param val 检测值
 * @returns 是/否
 */
export default function isObjectLiteral(val: unknown): val is object {
  return getType(val) === 'object'
}