import { RefObject } from 'react'
import { MayArray } from 'typings/tools'
import { flat } from 'utils/functions/array'

// 约定！！！：应用所有的 ref 都是 RefObject // todo： 这个要写进 ReadMe 里
export default function parseRefs<T>(refs: RefObject<MayArray<T>>, parser: (refCurrent: T) => any) {
  flat(refs.current).forEach((refCurrent) => {
    if (refCurrent) parser(refCurrent)
  })
}
