export type Arr = readonly unknown[]
/**
 * 绑定函数的头几个参数
 * @param fn 原函数
 * @param headArgs 头几个参数
 */
export default function bindHead<T extends Arr, U extends Arr, R>(
  fn: (...args: [...T, ...U]) => R,
  ...headArgs: T
) {
  return (...tailArgs: U) => fn(...headArgs, ...tailArgs)
}
