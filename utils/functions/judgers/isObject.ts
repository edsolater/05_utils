import _getType from './_getType'
/**
 * 检测值是否是个对象(!!!不包含数组!!!)
 * @param val 检测值
 * @returns 是/否
 */
export default function isObject(val: unknown): val is object {
  return _getType(val) === 'object'
}
