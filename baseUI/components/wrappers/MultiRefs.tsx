import { mergeProps } from 'baseUI/functions'
import mapChildren from 'baseUI/functions/mapChildren'
import useCallbackRef from 'baseUI/hooks/useCallbackRef'
import React from 'react'
import { createActionTracker } from 'utils/containers/ActionTracker'
import { omit } from 'utils/functions/object'
import { ExProps } from './Ex'
import objectSafelyGet from '../../../utils/functions/object/objectSafelyGet'
import { tryCatch } from '../../../utils/functions/magic/tryCatch'

/**
 * @WrapperComponent  expose a sigle DomRef to outer, but multi DomRefs to inner
 * @example
 * <MultiRefs>
 *   <Div />
 *   <Div />
 *   <Div />
 *   <Div />
 * </MultiRefs>
 */
export default function MultiRefs({ children, domRef, ...restProps }: ExProps) {
  const elementStack: HTMLElement[] = []

  const actionTracker = createActionTracker({
    get: (path) => objectSafelyGet(elementStack[0], path),
    apply(path, args) {
      elementStack.forEach((el) => {
        tryCatch(() => objectSafelyGet(el, path)?.(...args), console.warn)
      })
    }
  })
  domRef && Reflect.set(domRef, 'current', actionTracker)

  return mapChildren(children, (child, idx) =>
    React.cloneElement(
      child,
      omit(
        mergeProps(
          restProps,
          {
            domRef: useCallbackRef((el: HTMLElement) => {
              elementStack[idx] = el
            })
          },
          child.props
        )
      )
    )
  )
}
