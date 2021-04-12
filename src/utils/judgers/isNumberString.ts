/**
 * 判断是否是字符串形式的数字（此数字必须在安全区域内？）
 */
function isNumberString(val: any): boolean {
  if (typeof val !== 'string') return false
  return !Number.isNaN(val)
}
export default isNumberString
