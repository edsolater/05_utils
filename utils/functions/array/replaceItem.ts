import { isFunction, isNumber } from '../judgers'

/**
 * 
 * @param arr original array
 * @param replaceTarget old item | old item index | function 
 * @param newItem new item
 * @returns new array
 * @example
 * console.log(replaceItem(['hello', 'world'], 'hello', 'hi')) //=> ['hi', 'world']
 * console.log(replaceItem(['hello', 'world'], 0, 'hi')) //=> ['hi', 'world']
 * console.log(replaceItem([3, 4], 4, 55)) //=> [3, 4] // input number is treated as index
 * console.log(replaceItem([3, 4], 1, 55)) //=> [3, 55]
 * console.log(replaceItem([3, 4], (_, idx) => idx === 1, 55)) //=> [3, 55] // use function 
 */
export default function replaceItem<T, U>(
  arr: readonly U[],
  replaceTarget: U | number | ((item: U, index: number) => boolean),
  newItem: T
) {
  const index = isNumber(replaceTarget)
    ? replaceTarget
    : arr.findIndex((item, idx) =>
        isFunction(replaceTarget) ? replaceTarget(item, idx) : item === replaceTarget
      )
  if (index === -1 || index >= arr.length) return [...arr]
  return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
}

//#region ------------------- test -------------------
// console.log(replaceItem(['hello', 'world'], 'hello', 'hi'))
// console.log(replaceItem(['hello', 'world'], 1, 'hi'))
// console.log(replaceItem([3, 4], 4, 55)) // input number is treated as index
// console.log(replaceItem([3, 4], 1, 55))
// console.log(replaceItem([3, 4], (_, idx) => idx === 1, 55)) // use function 
//#endregion
