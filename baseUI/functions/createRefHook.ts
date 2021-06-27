import { RefObject, useRef } from 'react'

type RefedHook<T extends HTMLElement, H extends (...any: any[]) => any> = H extends (
  _,
  ...rest: infer R
) => any
  ? (...params: R) => RefObject<T>
  : never

export default function createRefHook<
  T extends HTMLElement,
  H extends (ref: RefObject<any>, ...any: any[]) => any
>(hook: H): RefedHook<T, H> {
  const wrappedHook = (...params) => {
    const ref = useRef<T>()
    hook(ref, ...params)
    return ref
  }
  // @ts-ignore
  return wrappedHook
}
