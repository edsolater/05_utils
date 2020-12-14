/**
 * 插入新的数组项（返回新数组）
 */
function insertItems<T extends Array<any>, U extends number, V extends Array<any>>(
  target: T,
  fromIndex: U,
  ...items: V
): T & V {
  const newArray = [...target]
  newArray.splice(fromIndex, 0, ...items)
  //@ts-ignore
  return newArray
}
export default insertItems

