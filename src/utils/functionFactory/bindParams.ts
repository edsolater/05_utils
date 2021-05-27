import { AnyFn } from 'typings/constants'

/**
 * 绑定函数参数，以生成一个新函数
 * @deprecated 直接写箭头函数更方便
 * @returns
 */
export default function bindParams<T extends AnyFn>(
  fn: T | undefined,
  params: Parameters<T>
): () => ReturnType<T> {
  return () => fn?.(...params)
}
