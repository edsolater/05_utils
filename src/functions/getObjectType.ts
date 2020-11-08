/**
 * 获取对象的类型（以小写形式）
 * @param obj 目标对象
 * @returns 代表类型的字符串
 * @example
 * getType(new Date()) // 'date'
 */
export default function getObjectType(val: unknown):  string {
  const typeString = Object.prototype.toString.call(val)
  return typeString.slice(8, typeString.length - 1).toLowerCase()
}
