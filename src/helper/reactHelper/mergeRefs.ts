import { RefCallback, useCallback } from 'react'

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
