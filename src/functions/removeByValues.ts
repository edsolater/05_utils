import { Values } from 'typings/tools'
import objectFilter from './objectFilter'
/**
 * 基于values删除对象项（返回新对象）
 * @deprecated 相对于removeByKeys， 类型提示有问题
 */
function removeByValues<T extends Readonly<object>, U extends Values<T>>(
  obj: T,
  ...values: U[]
): Partial<T>{
  //@ts-ignore
  return objectFilter(obj, ([, value]) => values.includes(value))
}
export default removeByValues
