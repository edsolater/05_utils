import { MayDeepArray } from 'typings/tools'
import isObjectLike from 'utils/functions/judgers/isObjectOrArray'
import isExist from 'utils/functions/judgers/isExist'
import flatMayArray from 'utils/functions/array/flatMayArray'

export type ClassName = any | { [classname: string]: boolean }
// <Div> 专用
export default function classname(classNameArray: MayDeepArray<ClassName>) {
  return flatMayArray([classNameArray])
    .filter(isExist)
    .flatMap((classItem) =>
      isObjectLike(classItem)
        ? Object.entries(classItem).map(([classString, condition]) => condition && classString)
        : classItem
    )
    .join(' ')
}
