import { ObjectValues } from 'typings/tools'
import objectFilter from './objectFilter'
/**
 * 基于values删除对象项（返回新对象）
 * @deprecated 相对于omitByKeys， 类型提示有问题
 */
function omitByValues<T extends Readonly<object>, U extends ObjectValues<T>>(
  obj: T,
  ...values: U[]
): Partial<T>{
  //@ts-ignore
  return objectFilter(obj, ([, value]) => !values.includes(value))
}
export default omitByValues
