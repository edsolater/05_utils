import { MayArray } from '../../typings/tools'
import isArray from './judgers/isArray'
import isObjectLike from './judgers/isObjectOrArray'
import isPrimitive from './judgers/isPrimitive'

type SortOptions<T extends object> = MayArray<{
  key: keyof T
  direction: 'ascending' | 'descending'
}>

type FilterOptions<T extends object> = MayArray<(value: T) => boolean | undefined>

/**
 * the idea is from notion's database
 * @see https://www.notion.so/Intro-to-databases-fd8cd2d212f74c50954c11086d85997e#f9b40d60db734c05b7e9a207f889b0a0
 */
export function sortTableList<T extends object>(target: T[], settings: SortOptions<T>) {
  function getSorter<T extends object>(
    [a, b]: [T, T],
    setting: { key: keyof T; direction: string }[]
  ): 0 | -1 | 1 {
    for (const { key, direction } of setting) {
      const valueA = a[key]
      const valueB = b[key]
      if (isPrimitive(valueA) && isPrimitive(valueB)) {
        if (valueA === valueB) continue
        if (valueA < valueB) return (-1 * (direction === 'ascending' ? 1 : -1)) as 1 | -1
        if (valueA > valueB) return (1 * (direction === 'ascending' ? 1 : -1)) as 1 | -1
      }
    }
    return 0
  }
  return target.slice(0).sort((a, b) => getSorter([a, b], [settings].flat()))
}

export function filterTableList<T extends object>(target: T[], settings: FilterOptions<T>) {
  return [settings].flat().reduce((acc, rule) => acc.filter((item) => rule(item)), target.slice(0))
}

/**
 * it is a shortcut  {@link filterTableList}
 */
export function searchFromTableList<T extends object>(
  target: T[],
  text: string,
  { canFuzzyMatching = true }: { canFuzzyMatching?: boolean } = {}
) {
  const searchFilter = (item: T, targetText: string) => {
    const allValueText = Object.values(item).filter(isPrimitive).join(' ')
    return canFuzzyMatching
      ? new RegExp(`${[...targetText].join('.*')}`).test(allValueText)
      : allValueText.includes(targetText)
  }
  return filterTableList(target, [(item) => searchFilter(item, text)])
}

/**
 * check if target is an object list that can be treated as a database
 */
export function isTableList(target: any): target is object[] {
  return isArray(target) && target.every(isObjectLike)
}

//#region ------------------- test -------------------
// const foo = [
//   { key: 2, name: 'alpha' },
//   { key: 5, name: 'c' },
//   { key: 3, name: 'd' },
//   { key: 3, name: 'a' },
//   { key: 3, name: 'hello' },
//   { key: 3, name: 'apple' },

//   { key: 3, name: 'e' },
//   { key: 3, name: 'i' }
// ]

// console.log(
//   sortTableList(foo, [
//     { key: 'key', direction: 'ascending' },
//     { key: 'name', direction: 'ascending' }
//   ])
// )
// console.log(searchFromTableList(foo, 'ah'))
//#endregion
