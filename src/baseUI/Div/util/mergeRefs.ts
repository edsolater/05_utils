import { MutableRefObject, RefCallback, useCallback } from 'react'
import { MayDeepArray } from 'typings/tools'

function loadRef(ref, el) {
  if (Array.isArray(ref)) {
    ref.forEach((innerRef) => loadRef(innerRef, el))
  } else if (typeof ref === 'function') {
    ref(el)
  } else if (ref != null && ref !== undefined) {
    ref.current = el
  }
}
export function mergeRefs<T = any>(
  ...refs: Array<IRefs<T>>
): RefCallback<T> {
  return useCallback((el) => {
    if (el) {
      refs.flat(Infinity).forEach((ref) => loadRef(ref, el))
    }
  }, refs)
}
export type IRef<T = undefined> =
  | ((el: T) => void)
  | MutableRefObject<T | null | undefined>
  | null
  | undefined
export type IRefs<T = undefined> = MayDeepArray<IRef<T>>
