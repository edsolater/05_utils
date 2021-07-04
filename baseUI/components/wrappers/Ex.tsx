import { mergeProps } from 'baseUI/functions'
import React, { ReactNode } from 'react'
import { DivProps, WrapperProps } from '../baseProps'
import { parseIRefsWrapper } from 'baseUI/functions/parseRefs'
import useCallbackRef from 'baseUI/hooks/useCallbackRef'
import { splitObject } from 'utils/functions/object'
import { objectMapKey } from 'utils/functions/object/objectMap'
import { toCamelCase } from 'utils/functions/string/changeCase'
import mapChildren from 'baseUI/functions/mapChildren'

type AllProps = Omit<WrapperProps & DivProps, 'children'>
type Exify<T extends Record<string, any>> = {
  [K in keyof T as `ex${Capitalize<K & string>}`]: T[K]
}
export interface VerboseProps extends Exify<AllProps>, AllProps {
  children?: ReactNode
}

function parseExProp<T extends Record<string, any>>(exProps: T) {
  return objectMapKey(exProps, (key) => {
    const withoutEX = (key as string).slice('ex'.length)
    return toCamelCase(withoutEX)
  })
}

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
  const parsedExProps: AllProps = parseExProp(exProps)
  const { domRef, ...parsedPropsWithoutRef } = mergeProps(originalProps, parsedExProps)

  return mapChildren(children, (child, idx) =>
    React.cloneElement(
      child,
      mergeProps(parsedPropsWithoutRef, {
        domRef: useCallbackRef((dom) =>
          parseIRefsWrapper(domRef, (ref) => ((ref.current ??= [])[idx] = dom))
        )
      })
    )
  )
}
