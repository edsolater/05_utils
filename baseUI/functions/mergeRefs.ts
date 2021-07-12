import { MutableRefObject, RefCallback, RefObject } from 'react'
import { isArray, isFunction, isNullish } from 'utils/functions/judgers'
import createCallbackRef from './createCallbackRef'

function loadRef(ref: RefCallback<any> | MutableRefObject<any> | null, el: any) {
  if (isNullish(ref)) return

  if (isFunction(ref)) {
    ref(el)
  } else if (isArray(ref.current)) {
    // 👇 have to do that to pretend the address of variable
    ref.current.forEach((_, idx) => {
      ref.current.splice(idx, 1, el)
    })
  } else {
    ref.current = el
  }
}

export default function mergeRefs<T = any>(
  ...refs: (MutableRefObject<T> | undefined)[]
): RefObject<T> {
  return createCallbackRef((el) => refs.filter(Boolean).forEach((ref) => loadRef(ref!, el)))
}
