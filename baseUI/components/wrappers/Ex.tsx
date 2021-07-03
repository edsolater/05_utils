import { mergeProps } from 'baseUI/functions'
import React, { ReactNode } from 'react'
import { DivProps, WrapperProps } from '../baseProps'
import cloneElements from '../../functions/cloneElements'
import { parseIRefsWrapper } from 'baseUI/functions/parseRefs'
import { IRefs } from 'baseUI/functions/mergeRefs'
import useCallbackRef from 'baseUI/hooks/useCallbackRef'
import { splitObject } from 'utils/functions/object'
import { objectMapKey } from 'utils/functions/object/objectMap'
import { toCamelCase } from 'utils/functions/string/changeCase'

type AllProps = WrapperProps & DivProps
type ExProps = {
  [K in keyof AllProps as `ex${Capitalize<K & string>}`]: AllProps[K]
}
export interface VerboseProps extends WrapperProps, DivProps, ExProps {}

/**
 * @WrapperComponent  this <Ex> is this the base of other wrapperComponents
 *
 * ex 前缀是为了规避同props自动覆盖的问题（JavaScript语言规定）
 *
 * @example
 * <Ex exOnClick={() => console.log(3)}>
 *   <Div />
 * </Ex>
 */
export default function Ex({ children, ...restProps }: VerboseProps) {
  const [exProps, originalProps] = splitObject(restProps, (key) => (key as string).startsWith('ex'))
  const parsedExProps = objectMapKey(exProps, (key) => {
    const withoutEX = (key as string).slice('ex'.length)
    return toCamelCase(withoutEX)
  })

  return <Refs {...mergeProps(parsedExProps, originalProps)}>{children}</Refs>
}

interface DomRefProps extends DivProps, WrapperProps {
  /** 为了避免与domRef产生覆盖行为，所以以ex为开头 */
  exDomRef?: IRefs<HTMLElement>
}
function Refs({ children, domRef, ...restProps }: DomRefProps) {
  return cloneElements(children, (child, idx) =>
    React.cloneElement(
      child,
      mergeProps(restProps, {
        domRef: useCallbackRef((dom) =>
          parseIRefsWrapper(domRef, (ref) => ((ref.current ??= [])[idx] = dom))
        )
      })
    )
  )
}
