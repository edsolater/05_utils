/**
 * 获取对象的项数
 * @param obj 目标对象
 * @example
 * getObjectSize({a:1, b:2}) // 2
 */
export default function getObjectSize(obj:object) {
  return Object.keys(obj).length
}