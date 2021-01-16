export type Arr = readonly unknown[]
/**
 * 绑定函数的头几个参数
 * 与原生的.bind 作用相同
 * @param fn 原函数
 * @param headArgs 头几个参数
 * @example
 * const add = (a: number, b: number) => a + b
 * const testFn = bindHead(add, 3)
 * // testFn(1) === add(3, 1)
 */
export default function bindHead<T extends Arr, U extends Arr, R>(
  fn: (...args: [...T, ...U]) => R,
  ...headArgs: T
) {
  return (...tailArgs: U) => fn(...headArgs, ...tailArgs)
}
