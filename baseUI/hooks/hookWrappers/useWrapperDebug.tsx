import { StatePairArray } from 'baseUI/types/react'
import { useRef } from 'react'
import { isFunction } from 'utils/functions/judgers'

/**
 * @param hook need observe hook
 * @param options some options for useWrapperDebug
 * @returns same API hooks, but will debug it
 * @example
 * const useDebugState = useWrapperDebug(useState, {name: 'example hook'})
 * const [state, setState] = useDebugState()
 */
export default function useWrapperDebug<T extends (...params) => StatePairArray>(
  hook: T,
  options: { name?: string } = { name: 'untitle debug' }
): T {
  //@ts-expect-error force type
  return (...args: any[]) => {
    const initValue = args[0]
    const prevStateRecord = useRef(initValue)
    const [state, _setState, controller] = hook(...args)
    const setState = (setStateAction: unknown) => {
      if (isFunction(setStateAction)) {
        const proxiedSetStateFn = (prevState) => {
          const result = setStateAction(prevState)
          console.debug(`useWrapperDebug(${options.name}): ${prevStateRecord.current} -> ${result}`)
          prevStateRecord.current = result
          return result
        }
        _setState(proxiedSetStateFn)
      } else {
        const newState = setStateAction
        console.debug(`useWrapperDebug(${options.name}): ${prevStateRecord.current} -> ${newState}`)
        prevStateRecord.current = newState
        _setState(newState)
      }
    }
    return [state, setState, controller]
  }
}
