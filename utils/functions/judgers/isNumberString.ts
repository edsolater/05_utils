/**
 * 判断是否是字符串形式的数字（此数字必须在安全区域内？）
 */
function isNumberString(val: any): boolean {
  if (typeof val !== 'string') return false
  //@ts-expect-error
  return !isNaN(val) // 不能用Number.isNaN，他们在数字字符串上的表现并不一致
}
export default isNumberString
