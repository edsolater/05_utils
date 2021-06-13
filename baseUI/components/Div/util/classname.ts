import { MayDeepArray } from 'typings/tools'
import isObjectLike from 'utils/functions/judgers/isObjectOrArray'
import isExist from 'utils/functions/judgers/isExist'
import flat from 'utils/functions/array/flat'

export type ClassName = any | { [classname: string]: boolean }
export function classname(classNameArray: MayDeepArray<ClassName>) {
  return flat([classNameArray])
    .filter(isExist)
    .flatMap((classItem) =>
      isObjectLike(classItem)
        ? Object.entries(classItem).map(([classString, condition]) => condition && classString)
        : classItem
    )
    .join(' ')
}
