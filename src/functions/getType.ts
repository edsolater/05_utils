/**
 * 获取值的类型（以小写形式）
 * @param val 目标值
 * @returns 代表类型的字符串
 * @example
 * getType({}) // 'object'
 * getType(Object.create(null)) // 'object'
 * getType([]) // 'array'
 * getType(3) // 'number'
 * getType(null) // 'null'
 * getType(undefined) // 'undefined'
 * getType('xxx') // 'string'
 * getType(true) // 'boolean'
 * getType(Promise.resolve(2)) // 'promise'
 * getType(() => {}) // 'function'
 * getType(async () => {}) // 'asyncfunction'
 * getType(function* () {}) // 'generatorfunction'
 * getType(new Date()) // 'date'
 */
export default function getType(val: unknown) {
  const typeString = Object.prototype.toString.call(val)
  return typeString.slice(8, typeString.length - 1).toLowerCase()
}
