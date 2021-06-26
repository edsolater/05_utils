import { CSSObject, SerializedStyles } from '@emotion/react'
import { css } from '@emotion/css'
import flat from 'utils/functions/array/flat'
import isFunction from 'utils/functions/judgers/isFunction'
import isObjectLike from 'utils/functions/judgers/isObjectOrArray'
import isObject from 'utils/functions/judgers/isObject'
import divide from 'utils/functions/object/divide'
import { ICSS, ICSSObject } from './ICSS'
import mapValues from 'utils/functions/object/mapValues'
import { MayDeepArray } from 'typings/tools'
import isArray from 'utils/functions/judgers/isArray'
import { cache } from 'utils/functions/functionFactory'

/**
 * 用在非<Div>的组件上，与toCss目的相反
 * 组合cssMixin
 */
export function mixCSSObjects(
  ...icsses: MayDeepArray<ICSS | ((...any: any[]) => ICSS) | undefined | {}>[]
): ICSS {
  //@ts-expect-error
  return (
    flat(icsses)
      //@ts-ignore
      .map((icss) => (isFunction(icss) ? icss() : icss))
      .filter(isObjectLike)
  )
}
export const toICSS = <
  T extends (...any: any[]) => MayDeepArray<ICSS | ((...any: any[]) => ICSS) | undefined | {}>
>(
  cssFn: T
): ((...args: Parameters<T>) => ICSS) =>
  // @ts-expect-error know why
  cache((...args: Parameters<T>) => mixCSSObjects(cssFn(...args)))

/**在最终解析CSS时，中间件队列 */
const middlewareList = [middlewareCSSTransform]

/**
 * 用在最终的<Div>, 把css-in-js转换给emotion处理
 * @param icss
 */
export function parseICSS(icss: ICSS) {
  const composed = mergeDeep(icss) as CSSObject
  const middleware = (cssobj: ICSSObject) =>
    middlewareList.reduce((acc, modal) => modal(acc), cssobj)
  const nestedMiddleware = (cssobj: ICSSObject) =>
    middleware(
      mapValues(cssobj, (value) =>
        isObject(value) ? nestedMiddleware(value as ICSSObject) : value
      )
    )
  const parsedCSS = composed ? nestedMiddleware(composed) : undefined
  return css(parsedCSS)
}

/**
 * 处理Transform相关的单独属性
 * @param cssObj 未处理时的cssobject
 * @returns 处理后的cssobject
 */
function middlewareCSSTransform(cssObj: ICSSObject): ICSSObject {
  const targetProperties = ['translate', 'scale', 'rotate', 'skew']
  const cssKeys = Object.keys(cssObj)
  if (cssKeys.some((key) => targetProperties.includes(key))) {
    // 需要做解析处理
    const [rest, toParse] = divide(cssObj, ['translate', 'scale', 'rotate', 'skew'])
    //@ts-expect-error
    const composedValue: string = Object.entries(toParse).reduce(
      //@ts-expect-error
      (acc, [property, value]: ['translate' | 'scale' | 'rotate' | 'skew', any[]]) =>
        acc +
        (property === 'translate'
          ? `translate(${flat(value).join(', ') || 0})`
          : property === 'scale'
          ? `scale(${flat(value).join(', ') || 1})`
          : property === 'rotate'
          ? `rotate(${flat(value).join(', ') || 0})`
          : property === 'skew'
          ? `skew(${flat(value).join(', ') || 0})`
          : ''),
      ''
    )
    return { ...rest, ...(composedValue !== '' ? { transform: composedValue } : {}) }
  } else {
    // 无需再做解析处理
    return cssObj
  }
}

/**
 * 合并多个对象
 * (如果是数组，则合并)
 * @param objDeepArray 嵌套数组的对象
 * @example
 * mergeDeep({a:3, b:2}, {a:1}) // {a:1, b:2}
 * mergeDeep({a:3, b:2}, undefined, {a:1}) // {a:1, b:2}
 * mergeDeep({a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}) // {a:1, b:2, c:{a:2, b:3}}
 * mergeDeep({a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}, false) // {a:1, b:2, c:{a:2, b:3}}
 * mergeDeep({a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}, {c:false}) // {a:1, b:2, c:false}
 * mergeDeep({a:3, b:2, c:{a:2}}, [{a:1, c:{b:3}}, {c:false}]) // {a:1, b:2, c:false}
 *
 * mergeDeep({a:3, b:2, c:[2]}, {a:1, c:[3]}, {c:[4,5]}) // {a:1, b:2, c:[2,3,4,5]}
 */
export function mergeDeep<T>(...objDeepArray: MayDeepArray<T>[]): T {
  const flattedItems = flat(objDeepArray).filter(Boolean)
  const resultObj = {}
  for (const obj of flattedItems) {
    for (const [key, value] of Object.entries(obj ?? {})) {
      let mergedValue =
        isArray(resultObj[key]) && isArray(value)
          ? [...resultObj[key], ...value]
          : isObjectLike(resultObj[key]) && isObjectLike(value)
          ? mergeDeep([resultObj[key], value])
          : value
      resultObj[key] = mergedValue
    }
  }
  //@ts-expect-error
  return resultObj
}
