import { MayDeepArray } from 'typings/tools';
import isString from 'utils/judgers/isString';
import isObjectLike from 'utils/judgers/isObjectLike';

export type ClassName = MayDeepArray<any | { [classname: string]: boolean; }>;
export function classname(classNameArray: ClassName) {
  return [classNameArray]
    .flat(Infinity)
    .flatMap((classItem) => isObjectLike(classItem)
      ? Object.entries(classItem).map(([classString, condition]) => condition && classString)
      : classItem
    )
    .filter(isString)
    .join(' ');
}
