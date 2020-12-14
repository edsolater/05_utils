/**
 * 合并多个对象（会返回新对象）
 */
function mergeObjects<T, U>(obj1: T, obj2: U): T & U
function mergeObjects<T, U, V>(obj1: T, obj2: U, obj3: V): T & U & V
function mergeObjects<T, U, V, W>(obj1: T, obj2: U, obj3: V, obj4: W): T & U & V & W
function mergeObjects<T extends object >(...objs: T[]): T
function mergeObjects<T extends object>(...objs: T[]) {
  return Object.assign({}, ...objs)
}
export default mergeObjects
