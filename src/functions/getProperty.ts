/**
 * 简单地取对象的属性。
 * 但是能取对象中没有的属性，也不会类型报错。
 * @param obj 对象
 * @param prop 属性名
 * @param fallback 默认值（一般情况使用？？即可，不会做没必要的计算）
 * @returns 属性值
 * @example
 * getProperty({ a: 3, b: true }, 'c', 4) // 4
 * getProperty({ a: 3, b: true }, 'c') // undefined
 * getProperty({ a: 3, b: true }, 'a') //3
 */
export default function getProperty<O extends object, P extends keyof O | string, B = undefined>(
  obj: O,
  prop: P,
  fallback?: B
): P extends keyof O ? O[P] : B extends undefined ? undefined : NonNullable<B> {
  return (obj as any)[prop] ?? fallback
}
