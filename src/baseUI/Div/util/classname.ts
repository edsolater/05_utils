import { MayDeepArray } from 'typings/tools'
import isString from 'utils/judgers/isString'
import isObjectLike from 'utils/judgers/isObjectLike'
import isExist from 'utils/judgers/isExist'
import flat from 'utils/array/flat'

export type ClassName = any | { [classname: string]: boolean }
export function classname(classNameArray: MayDeepArray<ClassName>) {
  const result = flat([classNameArray]).filter(isExist)

  console.log('result: ', result)
  return result
    .flatMap((classItem) =>
      isObjectLike(classItem)
        ? Object.entries(classItem).map(([classString, condition]) => condition && classString)
        : classItem
    )
    .filter(isString)
    .join(' ')
}
