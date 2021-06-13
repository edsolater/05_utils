import { AnyFn, AnyObj } from 'typings/constants'
import { MayDeepArray } from 'typings/tools'
import flat from 'utils/functions/array/flat'
import { isUndefined } from 'utils/functions/judgers'
import isArray from 'utils/functions/judgers/isArray'
import isFunction from 'utils/functions/judgers/isFunction'
import isObject from 'utils/functions/judgers/isObject'
import notNullish from 'utils/functions/judgers/notNullish'
import parallelSwitch from 'utils/functions/magic/parallelSwitch'
import { _mergeObjects } from 'utils/functions/_mergeObjects'
import mergeFunction from './mergeFunction'

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
  const trimedProps = flat(propsObjs).filter(notNullish)
  // @ts-ignore
  if (trimedProps.length === 0) return {}
  if (trimedProps.length === 1) return trimedProps[0]
  return _mergeObjects(trimedProps, (key, v1, v2) =>
    parallelSwitch<string, any, any>(
      key,
      [
        [
          (key) => key === 'className' || 'css' || 'domRef',
          () => (isUndefined(v1) || isUndefined(v2) ? v1 ?? v2 : [v1, v2].flat)
        ],
        [() => isFunction(v1) && isFunction(v2), () => mergeFunction(v1 as AnyFn, v2 as AnyFn)],
        [() => isObject(v1) && isObject(v2), () => mergeProps(v1 as AnyObj, v2 as AnyObj)],
        [() => isArray(v1) && isArray(v2), () => (v1 as any[]).concat(v2)]
      ],
      v2 ?? v1
    )
  )
}
