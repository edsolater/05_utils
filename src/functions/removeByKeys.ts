/**
 * 基于keys删除对象项（返回新对象）
 */
function removeByKeys<T extends object, U extends keyof T>(
  obj: T,
  ...keys: U[]
): { [P in Exclude<keyof T, U>]: T[P] } {
  const newObj = { ...obj }
  keys.forEach(key => {
    delete newObj[key]
  })
  return newObj
}
export default removeByKeys
