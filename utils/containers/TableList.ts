interface BasicArrayLike<T> {
  length: number
  push(item: T): void
  toArray(): T[]

  map<U = any>(mapper: (item: T, idx: number) => U): BasicArrayLike<U>
  reduce(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T,
    initialValue?: T
  ): T
  reduce<U>(
    callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
    initialValue?: U
  ): U

  [Symbol.iterator](): IterableIterator<T>
  entries(): IterableIterator<[number, T]>
  keys(): IterableIterator<number>
  values(): IterableIterator<T>
}

interface TableList<T> extends BasicArrayLike<T> {
  $raw: T[]
  constructor(init: T[], options?: { key: (keyof T)[] })
  length: number
}

class TableList<T> {
  $raw: T[]
  constructor(init: T[], option?: { key: (keyof T)[] }) {
    this.$raw = new Proxy(Array.from(init), {
      /* TODO */
    })
  }
  get length() {
    return this.$raw.length
  }
  push(item: T) {
    this.$raw.push(item)
  }
  toArray() {
    return this.$raw
  }

  //@ts-ignore don't want to type-info in javascript filed
  map(...params) {
    //@ts-ignore don't want to type-info in javascript filed
    return new TableList(this.$raw.map(...params))
  }
  reduce(callbackfn, initialValue) {
    return this.$raw.reduce(callbackfn, initialValue)
  }

  *[Symbol.iterator]() {
    yield* this.$raw
  }
  entries() {
    return this.$raw.entries()
  }
  keys() {
    return this.$raw.keys()
  }
  values() {
    return this.$raw.values()
  }

  // establishIndex()
}

const foo = new TableList([
  { key: 2, name: 'sdf' },
  { key: 5, name: 'hello' }
])
foo.push({ key: 2, name: 'sdf' })
foo.map(({ key }) => key)
const a = [...foo]
console.log('foo.getArr: ', a)

const b = [1, 2, 3]
const bb = b.map((i) => String(i))
