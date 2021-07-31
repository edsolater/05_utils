import { StatePairArray } from 'baseUI/types/react'
import { isFunction } from 'utils/functions/judgers'

// TODO: too rude
export default function isHook(value: any): value is () => StatePairArray {
  return isFunction(value)
}
