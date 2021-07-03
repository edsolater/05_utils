import { RefObject, useRef } from 'react'

type RefedHook<T extends HTMLElement, H extends (...any: any[]) => any> = H extends (
  _,
  ...rest: infer R
) => infer U
  ? (...params: R) => [RefObject<T>, U]
  : never

export default function createRefHook<
  T extends HTMLElement,
  H extends (ref: RefObject<any>, ...any: any[]) => any
>(hook: H): RefedHook<T, H> {
  const wrappedHook = (...params) => {
    const ref = useRef<T>()
    const result = hook(ref, ...params)
    return [ref, result]
  }
  // @ts-ignore
  return wrappedHook
}
