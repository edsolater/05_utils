import objectFilter from './objectFilter'

/**
 * 删除对象的所有undefined属性，
 * 就是非undifined版的objectFilter
 * @param obj 目标对象
 * @todo 可选地提供判定为不必要的判定函数
 */
export default function clearObjectUndefined<T extends object, K extends keyof T>(
  obj: T
): { [P in K extends undefined ? never : K]: T[P] } {
  return objectFilter(obj, ([_, value]) => value !== undefined)
}
type Obja = { a: 1; b: undefined }
type Objb = Extract<Obja> // {a:1}

const data = [42, 21, undefined, 50, 40, undefined, 9];

const newX = data.filter(function( element ) {
   return element !== undefined;
});