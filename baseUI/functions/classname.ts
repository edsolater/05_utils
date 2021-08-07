import { MayDeepArray } from 'typings/tools'
import isObjectLike from '@edsolater/fnkit/dist/judgers/isObjectOrArray'
import isExist from '@edsolater/fnkit/dist/judgers/isExist'
import flatMayArray from '@edsolater/fnkit/dist/array/flatMayArray'

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
