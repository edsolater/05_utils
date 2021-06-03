import isIndex from '../judgers/isIndex'

/**
 * 基于items删除数组项（返回新数组）
 */
function removeItems<T extends Array<any>>(arr: T, ...items: T): T {
  const newArray = [...arr]
  items.forEach(item => {
    const removeIndex = newArray.indexOf(item)
    if (isIndex(removeIndex)) newArray.splice(removeIndex, 1)
  })
  //@ts-ignore
  return newArray
}
export default removeItems

/**
 * 副作用版
 * 删除数组中的值（会改变原数组）
 * @param arr 原数组
 * @param item 要删除的值
 * @returns 是否成功删除
 */
export function removeItemsMutably<T extends any>(arr: T[], item: T): boolean {
  const removeIndex = arr.indexOf(item)
  if (isIndex(removeIndex)) {
    arr.splice(removeIndex, 1)
    return true
  }
  return false
}
