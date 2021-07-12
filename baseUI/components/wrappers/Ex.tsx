import { mergeProps } from 'baseUI/functions'
import mapChildren from 'baseUI/functions/mapChildren'
import useCallbackRef from 'baseUI/hooks/useCallbackRef'
import { ICSS } from 'baseUI/style/ICSS'
import React, { MutableRefObject, ReactNode } from 'react'
import { createActionTracker } from 'utils/containers/ActionTracker'
import { tryCatch } from 'utils/functions/magic/tryCatch'
import { omit } from 'utils/functions/object'
import objectSafelyGet from 'utils/functions/object/objectSafelyGet'
import { AttachAnimateInjectProps } from './AttachAnimate'
import { AttachClickableInjectProps } from './AttachClickable'
import { AttachHoveableInjectProps } from './AttachHoverable'

export interface ExProps
  extends AttachClickableInjectProps,
    AttachHoveableInjectProps,
    AttachAnimateInjectProps {
  children?: ReactNode
  css?: ICSS // DECISION: should use atomic jss instead of tailwindCSS
  domRef?: MutableRefObject<any>
}

function SingleEx(children: ReactNode, props: any): JSX.Element {
  // @ts-expect-error ReactNode is missingly wrong
  return React.isValidElement(children) ? React.cloneElement(children, props) : children
}

function MultiRefEx(
  children: ReactNode,
  domRef: React.MutableRefObject<any> | undefined,
  restProps: any
) {
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

/**
 * @WrapperComponent  this <Ex> is this the base of other wrapperComponents
 * @example
 * <Ex exOnClick={() => console.log(3)}>
 *   <Div />
 *   <Div />
 *   <Div />
 * </Ex>
 */
export default function Ex({ children, domRef, ...restProps }: ExProps): JSX.Element {
  return React.Children.count(children) <= 1
    ? SingleEx(children, { ...restProps, domRef })
    : MultiRefEx(children, domRef, restProps)
}
