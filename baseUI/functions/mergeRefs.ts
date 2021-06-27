import { MutableRefObject, RefCallback, useCallback } from 'react'
import { MayArray } from 'typings/tools'
import { isExist } from 'utils/functions/judgers'

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
      refs
        .flat(Infinity)
        .filter(isExist)
        .forEach((ref) => loadRef(ref, el))
    }
  }, refs)
}

export function parseObjectRefs<T = any>(ref: MutableRefObject<T>): T {
  return ref.current
}

export type IRef<T = any> = MutableRefObject<T | null | undefined> | null | undefined
export type IRefs<T = any> = MayArray<IRef<MayArray<T>>>
