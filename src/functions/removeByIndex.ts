/**
 * 基于index删除数组项（返回新数组）
 */
function removeByIndex<T extends Array<any>, U extends number, V extends number>(
  arr: T,
  fromIndex: U,
  length: V
): T {
  const newArray = [...arr]
  newArray.splice(fromIndex, length)
  //@ts-ignore
  return newArray
}
export default removeByIndex
