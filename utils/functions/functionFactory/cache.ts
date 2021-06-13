import isObjectLike from "../judgers/isObjectOrArray"

// COUNT：使用次数 1
type Key = string
type ArrayHash = `__map_value_hash__${number}`

/**
 * like JavaScript Map , but use shallow compare
 * @todo the shallow compare is 2 level, not elegant
 */
function ShallowMap<InputKey extends object | { [key: string]: unknown }, ReturnedValue>(
  options: {
    shallowCompare?: boolean
  } = {}
) {
  Object.assign(options, { shallowCompare: true } as Parameters<typeof ShallowMap>[0], options)

  let hashNumberStamp = 0

  const objectHashMap = new Map<object, ArrayHash>()

  // this will be used only if use shallow compare (this can be set in options)
  const objectHashMap__inner = new Map<object, ArrayHash>()

  // compute idle key for parameters in an invoke.
  const calcKey = (input: unknown, valueMap = objectHashMap, canShallow = true): Key =>
    isObjectLike(input)
      ? Object.entries(input)
          .map(([key, val]) => {
            if (typeof val !== 'object' || val === null) return `${key}${val}`
            if (valueMap.has(val)) return valueMap.get(val)
            if (options.shallowCompare && canShallow) {
              const innerKey = calcKey(val, objectHashMap__inner, false)
              return `${key}${innerKey}`
            }
            valueMap.set(val, `__map_value_hash__${++hashNumberStamp}` as const)
          })
          .join(' ')
      : String(input)

  const returnedValueMap = new Map<Key, ReturnedValue>()

  return {
    set(arrayKey: InputKey, value: ReturnedValue) {
      const keyString = calcKey(arrayKey)
      return returnedValueMap.set(keyString, value)
    },
    get(arrayKey: InputKey) {
      const keyString = calcKey(arrayKey)
      return returnedValueMap.get(keyString)
    },
    has(arrayKey: InputKey) {
      const keyString = calcKey(arrayKey)
      return returnedValueMap.has(keyString)
    }
  }
}
/**
 * 让函数自带缓存功能，
 * TODO：但这cache依然是全等比较，感觉不太对啊
 */
type AnyFunction = (...args: any[]) => void
type CachedFunction<F extends AnyFunction> = F

export default function cache<F extends AnyFunction>(originalFn: F): CachedFunction<F> {
  const cache = ShallowMap<Parameters<F>, ReturnType<F>>()
  //@ts-expect-error
  return (...args: Parameters<F>) => {
    if (cache.has(args)) return cache.get(args)
    else {
      //@ts-expect-error
      const returnedValue: ReturnType<F> = originalFn(...args)
      cache.set(args, returnedValue)
      return returnedValue
    }
  }
}
//#region ------------------- 测试 -------------------
// const cachedAdd = cache((a: number, b: number) => {
//   console.log(a, b)
//   return a + b
// })
// console.log(cachedAdd(3, 4))
// console.log(cachedAdd(3, 4))
// console.log(cachedAdd(3, 4))
// console.log(cachedAdd(3, 4))
// console.log(cachedAdd(3, 4))
// console.log(cachedAdd(3, 4))
// console.log(cachedAdd({ a: 3, b: { a: 1 } }, 4))
// console.log(cachedAdd({ a: 3, b: { a: 1 } }, 4))
// console.log(cachedAdd({ a: 3 }, 4))
// console.log(cachedAdd({ a: 3 }, 4))
// console.log(cachedAdd({ a: 3 }, 4))
//#endregion
