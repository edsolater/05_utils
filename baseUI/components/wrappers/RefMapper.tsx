import { mergeProps } from 'baseUI/functions'
import mapChildren from 'baseUI/functions/mapChildren'
import useCallbackRef from 'baseUI/hooks/useCallbackRef'
import React from 'react'
import { createActionObserver } from 'utils/containers/ActionObserver'
import { omit } from 'utils/functions/object'
import { ExProps } from './Ex'
import objectSafelyGet from '../../../utils/functions/object/objectSafelyGet'

/**
 * @WrapperComponent  expose a sigle DomRef to outer, but multi DomRefs to inner
 * @example
 * <RefMapper>
 *   <Div />
 *   <Div />
 *   <Div />
 *   <Div />
 * </RefMapper>
 */
export default function RefMapper({ children, domRef, ...restProps }: ExProps) {
  const childCount = React.Children.count(children)
  const elementStack = Array(childCount)

  const actionRecorder = createActionObserver({
    get(path) {
      const [firstElement] = elementStack
      return objectSafelyGet(firstElement, path)
    },
    apply(path, args) {
      elementStack.forEach((el) => objectSafelyGet(el, path)?.(...args))
    }
  })
  domRef && Reflect.set(domRef, 'current', actionRecorder)
  return mapChildren(children, (child, idx) =>
    React.cloneElement(
      child,
      omit(
        mergeProps(
          restProps,
          {
            domRef: useCallbackRef((el) => {
              elementStack[idx] = el
            })
          },
          child.props
        )
      )
    )
  )
}
