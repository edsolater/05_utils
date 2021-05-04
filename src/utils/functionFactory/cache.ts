// COUNT：使用次数 1
type Key = string
type KeyNumber = number
function ArrayKeyMap<ArrayKey extends Array<unknown>, ReturnedValue>() {
  let keyCount = 0
  const keyMap = new Map<ArrayKey[number], KeyNumber>()
  const calcKey = (arr: ArrayKey) =>
  arr
  .map((item) => {
    if (!keyMap.has(item)) {
      keyMap.set(item, ++keyCount)
    }
    return keyMap.get(item)
  })
  .join(' ')
  
  const ValueMap = new Map<Key, ReturnedValue>()
  return {
    set(arrayKey: ArrayKey, value: ReturnedValue) {
      const keyString = calcKey(arrayKey)
      return ValueMap.set(keyString, value)
    },
    get(arrayKey: ArrayKey) {
      const keyString = calcKey(arrayKey)
      return ValueMap.get(keyString)
    },
    has(arrayKey: ArrayKey) {
      const keyString = calcKey(arrayKey)
      return ValueMap.has(keyString)
    }
  }
}
/**
 * 让函数自带缓存功能，
 * TODO：但这cache依然是全等比较，感觉不太对啊 
 */
type AnyFunction = (...args: any[]) => void
type CachedFunction<F extends AnyFunction> = F
export default function cache<T extends AnyFunction>(originalFn: T): CachedFunction<T> {
  const cache = ArrayKeyMap<Parameters<T>, ReturnType<T>>()
  //@ts-expect-error
  return (...args: Parameters<T>) => {
    if (cache.has(args)) return cache.get(args)
    else {
      //@ts-expect-error
      const returnedValue: ReturnType<T> = originalFn(...args)
      cache.set(args, returnedValue)
      return returnedValue
    }
  }
}
//#region ------------------- 测试 -------------------
// const add = (a, b) => {
//   console.log(a, b)
//   return a + b
// }
// const cachedAdd = cache(add)
// cachedAdd(5,6)
// cachedAdd(5,6)
// cachedAdd(5,6)
// cachedAdd(5,6)
//#endregion
