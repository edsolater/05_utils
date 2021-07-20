// interface BasicArrayLike<T> {
//   length: number
//   push(item: T): void
//   toArray(): T[]

import { fall } from 'utils/functions/magic'
import isPrimitive from '../functions/judgers/isPrimitive'
import shrinkToValue from '../functions/magic/shrinkToValue'
import mergeDeep from '../functions/object/mergeDeep'

//   map<U>(mapper: (item: T, idx: number) => U): BasicArrayLike<U>
//   reduce<U>(
//     callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
//     initialValue?: U
//   ): U

//   [Symbol.iterator](): IterableIterator<T>
//   entries(): IterableIterator<[number, T]>
//   keys(): IterableIterator<number>
//   values(): IterableIterator<T>
// }
interface TableListFormatOptions<T, U extends keyof T = keyof T> {
  sort?: { key: keyof T; direction: 'ascending' | 'descending' }[]
  filter?: { key: U; rule: (value: T[U]) => boolean | undefined }[]
  properties?: { key: keyof T }[]
  search?: string
}
/**
 * the idea is from notion's database
 * @see https://www.notion.so/Intro-to-databases-fd8cd2d212f74c50954c11086d85997e#f9b40d60db734c05b7e9a207f889b0a0
 */
class TableList<T extends object> {
  rawArray: T[]
  formatOption: TableListFormatOptions<T> = {}

  constructor(init: T[], formatOption: TableListFormatOptions<T> = {}) {
    this.rawArray = new Proxy(Array.from(init), {
      /* TODO */
    })
    this.formatOption = formatOption
  }

  get size() {
    return this.rawArray.length
  }

  /** for don't want to change origin */
  clone() {
    return new TableList([...this.rawArray], this.formatOption)
  }

  /**
   * this will get pure object array without apply formatOption
   * !!! any action you change it's return array, will change TableList content also
   */
  getRaw() {
    return this.rawArray
  }

  /**
   * this is the main feature method of TableList
   */
  getResult() {
    // return this.rawArray
    const sortOptions = this.formatOption.sort ?? []

    const getPropertied = (source: T[]) => source
    const getFiltered = (source: T[]) => source
    const getSorted = (source: T[]) =>
      sortOptions.reduce(
        (arr, { key, direction }) =>
          arr.sort((a, b) => {
            const valueA = a[key]
            const valueB = b[key]
            if (isPrimitive(valueA) && isPrimitive(valueB)) {
              if (valueA === valueB) return 0
              if (valueA < valueB) return -1 * (direction === 'ascending' ? 1 : -1)
              if (valueA > valueB) return 1 * (direction === 'ascending' ? 1 : -1)
            }
            return 0
          }),
        source
      )

    const getSearched = (source: T[]) => source
    return getSearched(getSorted(getFiltered(getPropertied([...this.rawArray]))))
  }

  /**
   * this may change result of {@link TableList#getData}
   * @param formatOption
   */
  setFormatOption(
    formatOption:
      | TableListFormatOptions<T>
      | ((oldOption: TableListFormatOptions<T>) => TableListFormatOptions<T>)
      | undefined
  ) {
    this.formatOption = shrinkToValue(formatOption, [this.formatOption]) ?? {}
    return this
  }
  addFormatOption(formatOption: Partial<TableListFormatOptions<T>>) {
    return this.setFormatOption((old) => mergeDeep(old, formatOption))
  }
}

const foo = new TableList([
  { key: 2, name: 'a' },
  { key: 5, name: 'c' },
  { key: 3, name: 'e' },
  { key: 3, name: 'i' }
])
foo.addFormatOption({ sort: [{ key: 'key', direction: 'ascending' }] })
console.log(foo.formatOption)
console.log(foo.getResult())
