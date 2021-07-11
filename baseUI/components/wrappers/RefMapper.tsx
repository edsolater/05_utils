import { mergeProps } from 'baseUI/functions'
import mapChildren from 'baseUI/functions/mapChildren'
import useCallbackRef from 'baseUI/hooks/useCallbackRef'
import React from 'react'
import { omit } from 'utils/functions/object'
import { ExProps } from './Ex'

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

  const proxiedHTMLElement = new Proxy(
    {},
    {
      // TODO: deep Proxy
      set(target, p, value) {
        elementStack.forEach((el) => Reflect.set(el, p, value))
        return Reflect.set(target, p, value)
      },
      get(target, p) {
        return new Proxy(() => {}, {
          apply(target, thisArg, args) {
            elementStack.forEach((el) => el[p]?.(...args))
          }
        })
      }
    }
  )
  domRef && Reflect.set(domRef, 'current', proxiedHTMLElement)
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
