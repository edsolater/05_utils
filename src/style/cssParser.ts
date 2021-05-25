import { css, SerializedStyles } from '@emotion/react'
import flat from 'utils/array/flat'
import isFunction from 'utils/judgers/isFunction'
import isObjectLike from 'utils/judgers/isObjectLike'
import isObject from 'utils/judgers/isObject'
import divide from 'utils/object/divide'
import { ICSS, ICSSObject } from './ICSS'
import { mergeDeep } from '../utils/merge'
import mapValues from 'utils/object/mapValues'
import { MayDeepArray } from 'typings/tools'

/**
 * 用在非<Div>的组件上，与toCss目的相反
 * 组合cssMixin
 */
export function mixCSSObjects(
  ...icsses: MayDeepArray<ICSS | ((...any: any[]) => ICSS) | undefined | {}>[]
): ICSS {
  //@ts-expect-error
  return flat(icsses)
  //@ts-ignore
    .map((icss) => (isFunction(icss) ? icss() : icss))
    .filter(isObjectLike)
}

/**在最终解析CSS时，中间件队列 */
const middlewareList = [middlewareCSSTransform]

/**
 * 用在最终的<Div>, 把css-in-js转换给emotion处理
 * @param icss
 */
export function parseCSS(icss: ICSS): SerializedStyles {
  const composed = mergeDeep(icss)
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
export type OnlyObject<T> = T extends object ? never : T

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
