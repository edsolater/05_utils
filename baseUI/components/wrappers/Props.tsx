import { mergeProps } from 'baseUI/functions'
import React, { ReactNode } from 'react'
import { objectMapKey } from 'utils/functions/object/objectMap'
import splitObject from 'utils/functions/object/splitObject'
import { toCamelCase } from 'utils/functions/string/changeCase'
import { DivProps, WrapperProps } from '../baseProps'
import Refs from './Refs'

type AllProps = WrapperProps & DivProps
type ExProps = {
  [K in keyof AllProps as `ex${Capitalize<K & string>}`]: AllProps[K]
}
interface PropsProps extends WrapperProps, DivProps, ExProps {}

/**
 * @WrapperComponent add props to it's child (it is actually same as {@link Refs})
 *
 * ex 前缀是为了规避同props自动覆盖的问题（JavaScript语言规定）
 *
 * @example
 * <Props exOnClick={() => console.log(3)}>
 *   <Div />
 * </Props>
 */
export default function Props<P = never>({
  children,
  ...restProps
}: P extends never ? PropsProps : P & { children?: ReactNode }) {
  const [exProps, originalProps] = splitObject(restProps, (key) => (key as string).startsWith('ex'))

  const parsedExProps = objectMapKey(exProps, (key) => {
    const withoutEX = (key as string).slice('ex'.length)
    return toCamelCase(withoutEX)
  })

  return <Refs {...mergeProps(parsedExProps, originalProps)}>{children}</Refs>
}
