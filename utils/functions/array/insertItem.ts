import { ArrayItem } from '../../../typings/tools'
import { isFunction } from '../judgers'
import isNumber from '../judgers/isNumber'

/**
 * just like splice, but will not mutate original array
 * @param targetItem old item | old item index | function 
 * @param newItems new item
 * @returns new array
 * @example
 * console.log(insertItem(['hello', 'world'], 'hello', 'hi')) //=> ['hi', 'hello', 'world']
 * console.log(insertItem(['hello', 'world'], 0, 'hi')) //=> ['hi', 'hello', 'world']
 * console.log(insertItem([3, 4], 4, 55)) //=> [3, 4, 55] // input number is treated as index
 * console.log(insertItem([3, 4], 1, 55)) //=> [3, 55, 4]
 * console.log(insertItem([3, 4], (_, idx) => idx === 1, 55)) //=> [3, 55, 4] // use function 
 */
function insertItem<T extends ReadonlyArray<any>, U extends ArrayItem<T>, V extends ReadonlyArray<any>>(
  arr: T,
  targetItem: U | number | ((item: U, index: number) => boolean),
  ...newItems: V
): T & V {
  const newArray = [...arr]
  const index = isNumber(targetItem)
    ? targetItem
    : arr.findIndex((item, idx) =>
        isFunction(targetItem) ? targetItem(item, idx) : item === targetItem
      )
  newArray.splice(index, 0, ...newItems)
  //@ts-ignore
  return newArray
}
export default insertItem

//#region ------------------- test -------------------
// console.log(insertItem(['hello', 'world'], 'hello', 'hi'))
// console.log(insertItem(['hello', 'world'], 0, 'hi'))
// console.log(insertItem([3, 4], 4, 55)) // input number is treated as index
// console.log(insertItem([3, 4], 1, 55))
// console.log(insertItem([3, 4], (_, idx) => idx === 1, 55)) // use function
//#endregion
