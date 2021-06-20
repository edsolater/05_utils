import { AnyFn, AnyObj } from 'typings/constants'
import { objectMap } from '../functions/object'
import { isFunction, isObject, notUndefined } from '../functions/judgers'

type PromiseShape<T extends AnyObj> = {
  readonly [P in keyof T]: T[P] extends AnyFn
    ? (...params: Parameters<T[P]>) => Promise<ReturnType<T[P]>>
    : T[P] extends AnyObj
    ? Promise<T[P]> & PromiseShape<T[P]>
    : Promise<T[P]>
}

const isObjLoaded = <T>(rowObj: T): rowObj is NonNullable<typeof rowObj> => notUndefined(rowObj)

/**
 * the object contained in {@link PromiseShape this function} will return a proxied object.
 * Any access(property / methods) will return a promise.
 * if data is not loaded, this proxied object will fetch data in the background.
 * @param shape a object that descript the returned
 * @example
 * const wa = PromiseShape({
 *   b: 'hello',
 *   c: {
 *     be: 3
 *   },
 *   callB() {
 *     return 2
 *   }
 * })
 * wa.c.then(console.log) // { be: 3 }
 * wa.c.be.then((data) => console.log(data)) // 3
 * wa.callB().then((data) => console.log(data)) // 2

 */
export default function PromiseShape<T extends AnyObj>(
  shape: T,
  options?: {
    // TODO: not imple yet.
    onLoadPromise?: AnyFn
  }
): PromiseShape<T> {
  let rowObj: T | undefined = undefined
  let isLoading = false
  const loadCallbacks: Array<(rowObj: T) => void> = []

  const onLoad = (cb: (rowObj: T) => void) => {
    if (isObjLoaded(rowObj)) cb(rowObj)
    else {
      loadCallbacks.push(cb)
      load()
    }
  }
  const load = () => {
    if (isLoading || isObjLoaded(rowObj)) return
    // TEMP: just fack data
    setTimeout(() => {
      rowObj = shape
      isLoading = false
      loadCallbacks.forEach((cb) => cb(shape))
    }, 200)
    isLoading = true
  }

  const wrapObj = (targetObj, keyPath = []) =>
    objectMap(targetObj, (value, key) =>
      isFunction(value)
        ? (...params) =>
            new Promise((resolve) => {
              onLoad((loaded) => {
                const original = keyPath.reduce((o, pa) => o[pa], loaded)
                resolve(original[key as any](...params))
              })
            })
        : Object.assign(
            new Promise((resolve) => {
              onLoad((loaded) => {
                const original = keyPath.reduce((o, pa) => o[pa], loaded)
                resolve(original[key as any])
              })
            }),
            isObject(value) ? wrapObj(value, keyPath.concat(key as any)) : undefined
          )
    )

  return wrapObj(shape)
}

// const wa = PromiseShape({
//   b: 'hello',
//   c: {
//     be: 3
//   },
//   callB() {
//     return 2
//   }
// })
// wa.c.then(console.log) // { be: 3 }
// wa.c.be.then((data) => console.log(data)) // 3
// wa.callB().then((data) => console.log(data)) // 2
