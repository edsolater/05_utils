/**
 * the object contained in {@link ProxyModal this function} will return a proxied object.
 * Any access(property / methods) will return a promise.
 * Any set will be recorded when true data is not ready.
 * if data is not loaded, this proxied object will fetch data in the background.
 *
 */

import { isFunction, notUndefined } from '../functions/judgers'

// IDEA: 感觉要包装成一个hook，方便调用
/**
 * main function
 */
function ProxyModal<T extends Record<string | symbol, any>>(
  shape: T // TODO: really need?
): { readonly [P in keyof T]: Promise<T[P]> } {
  let rowObj: T | undefined = undefined
  const loadCallbacks: Array<(rowObj: T) => void> = []

  const isProperty = (name: string) => !isFunction(shape[name])
  const isMethod = (name: string) => isFunction(shape[name])

  const isLoaded = <T>(rowObj: T): rowObj is NonNullable<typeof rowObj> => notUndefined(rowObj)
  const loadRowObj = (income: T) => {
    rowObj = income
    loadCallbacks.forEach((cb) => cb(income))
  }
  const addListenerLoaded = (cb: (rowObj: T) => void) => {
    loadCallbacks.push(cb)
  }

  // TEMP: just fack data
  setTimeout(() => {
    loadRowObj(shape)
  }, 200)

  // @ts-ignore
  return new Proxy(shape, {
    get(_, propertyName: string) {
      if (isProperty(propertyName) && isLoaded(rowObj)) {
        return Promise.resolve(rowObj[propertyName])
      }
      if (isProperty(propertyName) && !isLoaded(rowObj)) {
        return new Promise((resolve) => {
          addListenerLoaded((obj) => {
            resolve(obj[propertyName])
          })
        })
      }
      if (isMethod(propertyName) && isLoaded(rowObj)) {
        return Promise.resolve((...parms: any) => rowObj![propertyName](...parms))
      }
      if (isMethod(propertyName) && !isLoaded(rowObj)) {
        return new Promise((resolve) => {
          addListenerLoaded((obj) => {
            resolve((...parms: any) => obj![propertyName](...parms))
          })
        })
      }
      return Promise.reject('cannot find this property in shape')
    }
  })
}

const wa = ProxyModal({
  b: 'hello',
  callB() {
    return 2
  }
})
console.log(wa)

wa.b.then((data) => console.log(data))
console.log(wa.callB)
