import { CSSObject } from '@emotion/react'
import { css } from '@emotion/css'
import flatMayArray from '@edsolater/fnkit/dist/array/flatMayArray'
import isFunction from '@edsolater/fnkit/dist/judgers/isFunction'
import isObjectLike from '@edsolater/fnkit/dist/judgers/isObjectOrArray'
import isObject from '@edsolater/fnkit/dist/judgers/isObject'
import divide from '@edsolater/fnkit/dist/object/divide'
import mapValues from '@edsolater/fnkit/dist/object/mapValues'
import { MayDeepArray } from 'typings/tools'
import { cache } from '@edsolater/fnkit/dist/functionFactory'
import mergeDeep from '@edsolater/fnkit/dist/object/mergeDeep'

export interface ICSSObject extends CSSObject {}
export type ICSS = MayDeepArray<ICSSObject | boolean | string | number | null | undefined>

/**
 * 用在非<Div>的组件上，与toCss目的相反
 * 组合cssMixin
 */
export function mixCSSObjects(
  ...icsses: MayDeepArray<ICSS | ((...any: any[]) => ICSS) | undefined | {}>[]
): ICSS {
  //@ts-expect-error
  return (
    flatMayArray(icsses)
      //@ts-ignore
      .map((icss) => (isFunction(icss) ? icss() : icss))
      .filter(isObjectLike)
  )
}

// just for type
export const toICSS = <
  T extends (...any: any[]) => MayDeepArray<ICSS | ((...any: any[]) => ICSS) | undefined | {}>
>(
  inputCssFn: T
): ((...args: Parameters<T>) => ICSS) =>
  // @ts-expect-error know why
  cache((...args: Parameters<T>) => mixCSSObjects(inputCssFn(...args)))

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
          ? `translate(${flatMayArray(value).join(', ') || 0})`
          : property === 'scale'
          ? `scale(${flatMayArray(value).join(', ') || 1})`
          : property === 'rotate'
          ? `rotate(${flatMayArray(value).join(', ') || 0})`
          : property === 'skew'
          ? `skew(${flatMayArray(value).join(', ') || 0})`
          : ''),
      ''
    )
    return { ...rest, ...(composedValue !== '' ? { transform: composedValue } : {}) }
  } else {
    // 无需再做解析处理
    return cssObj
  }
}
