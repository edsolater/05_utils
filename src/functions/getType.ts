import isArray from './isArray'
import isNull from './isNull'
import isObject from './isObject'

/**
 * 获取值的粗略类型（以小写形式）（不会显示是什么对象）
 * @param val 目标值
 * @returns 代表类型的字符串
 * @example
 * getType(null) // 'null'
 * getType(undefined) // 'undefined'
 * getType(true) // 'boolean'
 * getType(3) // 'number'
 * getType('xxx') // 'string'
 * getType(11n) // 'bigint'
 * getType(Symbol.for('hello')) // 'symbol'
 * getType([]) // 'array'
 * getType(() => {}) // 'function'
 * getType({}) // 'object'
 * getType(Object.create(null)) // 'object'
 * getType(new Date()) // 'object'
 */
export default function getType(
  val: unknown
):
  | 'null'
  | 'undefined'
  | 'boolean'
  | 'number'
  | 'string'
  | 'bigint'
  | 'symbol'
  | 'array'
  | 'function'
  | 'object' {
  return isNull(val) ? 'null' : isArray(val) ? 'array' : isObject(val) ? 'object' : typeof val
}
