import { createRef, RefObject } from 'react'

export default function createRefHook<
  T = HTMLElement,
  H = (ref: RefObject<any>, ...any: any[]) => any
>(hook: H): H extends (ref, ...rest: infer R) => any ? (...params: R) => RefObject<T> : never {
  const ref = createRef<T>()
  const wrappedHook = (...params) => {
    //@ts-ignore
    hook(ref, ...params)
    return ref
  }
  //@ts-ignore
  return wrappedHook
}
