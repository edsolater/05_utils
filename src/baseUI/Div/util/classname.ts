import { MayDeepArray } from 'typings/tools';
import isString from 'utils/judgers/isString';
import isObject from 'utils/judgers/isObject';

export type ClassName = MayDeepArray<any | { [classname: string]: boolean; }>;
export function classname(classNameArray: ClassName) {
  return [classNameArray]
    .flat(Infinity)
    .flatMap((classItem) => isObject(classItem)
      ? Object.entries(classItem).map(([classString, condition]) => condition && classString)
      : classItem
    )
    .filter(isString)
    .join(' ');
}
