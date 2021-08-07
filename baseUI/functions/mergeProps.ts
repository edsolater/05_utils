import { AnyFn, AnyObj } from 'typings/constants'
import flatMayArray from '@edsolater/fnkit/dist/array/flatMayArray'
import { isExist, isOneOf } from '@edsolater/fnkit/dist/judgers'
import isArray from '@edsolater/fnkit/dist/judgers/isArray'
import isFunction from '@edsolater/fnkit/dist/judgers/isFunction'
import isObject from '@edsolater/fnkit/dist/judgers/isObject'
import notNullish from '@edsolater/fnkit/dist/judgers/notNullish'
import parallelSwitch from '@edsolater/fnkit/dist/magic/parallelSwitch'
import _mergeObjects from '@edsolater/fnkit/dist/_mergeObjects'
import mergeFunction from './mergeFunction'
import mergeRefs from './mergeRefs'

/**prop may very deep like children */
export type AnyProp = { [props: string]: any }

export default function mergeProps<P1 = AnyProp, P2 = AnyProp>(
  ...propsObjs: [P1, P2]
): Exclude<P1 & P2, undefined>
export default function mergeProps<P1 = AnyProp, P2 = AnyProp, P3 = AnyProp>(
  ...propsObjs: [P1, P2, P3]
): Exclude<P1 & P2 & P3, undefined>
export default function mergeProps<P1 = AnyProp, P2 = AnyProp, P3 = AnyProp, P4 = AnyProp>(
  ...propsObjs: [P1, P2, P3, P4]
): Exclude<P1 & P2 & P3 & P4, undefined>
export default function mergeProps<
  P1 = AnyProp,
  P2 = AnyProp,
  P3 = AnyProp,
  P4 = AnyProp,
  P5 = AnyProp
>(...propsObjs: [P1, P2, P3, P4, P5]): Exclude<P1 & P2 & P3 & P4 & P5, undefined>
export default function mergeProps<P extends AnyProp | undefined>(
  ...propsObjs: P[]
): Exclude<P, undefined> {
  const trimedProps = flatMayArray(propsObjs).filter(notNullish)
  // @ts-ignore
  if (trimedProps.length === 0) return {}
  if (trimedProps.length === 1) return trimedProps[0]
  return _mergeObjects(trimedProps, (key, v1, v2) =>
    parallelSwitch<string, any, any>(
      key,
      [
        ['domRef', () => (v1 && v2 ? mergeRefs(v1 as any, v2 as any) : v1 ?? v2)],
        [
          (key) => isOneOf(key, ['className', 'css']) && isExist(v1) && isExist(v2),
          () => [v1, v2].flat()
        ],
        [() => isFunction(v1) && isFunction(v2), () => mergeFunction(v1 as AnyFn, v2 as AnyFn)],
        [() => isObject(v1) && isObject(v2), () => mergeProps(v1 as AnyObj, v2 as AnyObj)],
        [() => isArray(v1) && isArray(v2), () => (v1 as any[]).concat(v2)]
      ],
      v2 ?? v1
    )
  )
}
