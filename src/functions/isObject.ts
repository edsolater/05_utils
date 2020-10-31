/**
 * 判断是否是个对象
 * @param val 目标值
 */
export default function isObject(val: unknown) {
  return typeof val === 'object' && val !== null;
}
