import { MutableRefObject, RefCallback, useCallback } from 'react'
import { MayArray } from 'typings/tools'

export function mergeRefs<T = any>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined>
): RefCallback<T> {
  return useCallback((el) => {
    if (el) {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(el)
        } else if (ref != null && ref !== undefined) {
          ;(ref as React.MutableRefObject<T | null>).current = el
        }
      })
    }
  }, refs)
}
export type IRef<T = undefined> = ((el: T) => void) | MutableRefObject<T | null | undefined> | null | undefined
export type IRefs = MayArray<IRef>