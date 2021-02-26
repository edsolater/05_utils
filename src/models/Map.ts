export interface IMap<K, V> extends Map<K, V> {
  clear(): void
  delete(key: K): boolean
  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void
  get(key: K): V | undefined
  has(key: K): boolean
  set(key: K, value: V): this
  set(key: K, fn: (oldValue: V) => V): this
  readonly size: number

  //TODO:还有 Symbol.iterable
  [Symbol.iterator](): IterableIterator<[K, V]>
  entries(): IterableIterator<[K, V]>
  keys(): IterableIterator<K>
  values(): IterableIterator<V>

  __innerMap: Map<K, V> //除debug外，慎用
  getInnerArray(): Array<[K, V]>
  find(callbackfn: (value: V) => boolean): K | undefined
}

/**创造一个rect对象，如果信息不全，属性即为0 */
export function createMap<K, V>(init?: Array<[K, V]>): IMap<K, V> {
  const map = new Map<K, V>(init)
  const iMap: IMap<K, V> = {
    __innerMap: map,
    get size() {
      return map.size
    },
    clear() {
      return map.clear()
    },
    delete(key: K) {
      return map.delete(key)
    },
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any) {
      return map.forEach(callbackfn, thisArg)
    },
    get(key: K) {
      return map.get(key)
    },
    has(key: K) {
      return map.has(key)
    },
    set(...args) {
      const key = args[0]
      if (typeof args[1] === 'function') {
        const value = args[1](iMap.get(key))
        return createMap<K, V>([...map.entries(), [key, value]])
      } else {
        const value = args[1]
        return createMap<K, V>([...map.entries(), [key, value]])
      }
    },

    entries() {
      return map.entries()
    },
    keys() {
      return map.keys()
    },
    values() {
      return map.values()
    },

    getInnerArray() {
      return [...map.entries()]
    },
    find(callbackfn) {
      for (const [key, value] of map.entries()) {
        if (callbackfn(value)) return key
      }
    },
    [Symbol.iterator]() {
      return iMap.entries()
    },
    get [Symbol.toStringTag]() {
      return iMap.__innerMap.toString()
    }
  }
  return iMap
}
