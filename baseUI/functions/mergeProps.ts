import { AnyFn, AnyObj } from 'typings/constants'
import { MayDeepArray } from 'typings/tools'
import flat from 'utils/functions/array/flat'
import isArray from 'utils/functions/judgers/isArray'
import isFunction from 'utils/functions/judgers/isFunction'
import isObject from 'utils/functions/judgers/isObject'
import notNullish from 'utils/functions/judgers/notNullish'
import parallelSwitch from 'utils/functions/magic/parallelSwitch'
import { mergeObjects } from 'utils/functions/mergeObjects'
import mergeFunction from './mergeFunction'

/**prop may very deep like children */
type PropObject = object

export default function mergeProps<P extends Array<MayDeepArray<PropObject | undefined>>>(
  ...propsObjs: P
): any {
  const trimedProps = flat(propsObjs).filter(notNullish)
  if (trimedProps.length === 0) return {}
  if (trimedProps.length === 1) return trimedProps[0]
  return mergeObjects(trimedProps, (key, v1, v2) =>
    parallelSwitch<string, any, any>(
      key,
      [
        ['className', () => [v1, v2].flat()],
        ['css', () => [v1, v2].flat()],
        ['domRef', () => [v1, v2].flat()],
        [() => isFunction(v1) && isFunction(v2), () => mergeFunction(v1 as AnyFn, v2 as AnyFn)],
        [() => isObject(v1) && isObject(v2), () => mergeProps(v1 as AnyObj, v2 as AnyObj)],
        [() => isArray(v1) && isArray(v2), () => (v1 as any[]).concat(v2)]
      ],
      v2
    )
  )
}
