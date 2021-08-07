import { MutableRefObject } from 'react'
import { MayArray } from 'typings/tools'
import { flat } from '@edsolater/fnkit/dist/array'
import { IRefs } from './mergeRefs'

// 约定！！！：应用所有的 ref 都是 RefObject // todo： 这个要写进 ReadMe 里
export default function parseIRefs<T>(refs: IRefs<T>, parser: (refCurrent: NonNullable<T>) => any) {
  flat(refs).forEach((ref) =>
    flat(ref?.current).forEach((refCurrent) => {
      if (refCurrent) parser(refCurrent!)
    })
  )
}

export function parseIRefsWrapper<T>(
  refs: IRefs<T>,
  parser: (refObject: MutableRefObject<MayArray<T> | null | undefined>) => any
) {
  flat(refs).forEach((refObj) => {
    if (refObj) parser(refObj)
  })
}
