import isIndex from '../judgers/isIndex'

/**
 * 基于items删除数组项（返回新数组）
 */
function removeByItems<T extends Array<any>>(arr: T, ...items: T): T {
  const newArray = [...arr]
  items.forEach(item => {
    const removeIndex = newArray.indexOf(item)
    if (isIndex(removeIndex)) newArray.splice(removeIndex, 1)
  })
  //@ts-ignore
  return newArray
}
export default removeByItems
