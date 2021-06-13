import { MutableRefObject, RefCallback, useCallback } from 'react'
import { MayDeepArray } from 'typings/tools'

function loadRef(ref, el) {
  if (typeof ref === 'function') {
    ref(el)
  } else if (ref != null && ref !== undefined) {
    ref.current = el
  }
}
// IDEA: Maybe, proxy can replace callback ref
export default function mergeRefs<T = any>(...refs: Array<IRefs<T>>): RefCallback<T> {
  return useCallback((el) => {
    if (el) {
      refs.flat(Infinity).forEach((ref) => loadRef(ref, el))
    }
  }, refs)
}

export function parseObjectRefs<T = any>(ref: MutableRefObject<T>): T {
  return ref.current
}

export type IRef<T = undefined> =
  | ((el: T) => void)
  | MutableRefObject<T | null | undefined>
  | null
  | undefined
export type IRefs<T = undefined> = MayDeepArray<IRef<T>>
