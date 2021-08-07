import { isFunction } from '@edsolater/fnkit/dist/judgers'
import { CSSValue } from './cssUnits'

/**
 * @example
 * cssVar('--x') => 'var(--x)'
 * cssVar('--x', '0') => 'var(--x, 0)'
 * cssVar('--x', '0', 'px') => 'calc(var(--x, 0) * 1px)'
 */
export function getCssVariableString<T>(
  cssVariableName: T,
  fallback?: CSSValue,
  unit?: 'px' | 'deg' | (string & {})
) {
  return unit
    ? `calc(var(${cssVariableName}, ${fallback}) * 1${unit})`
    : fallback
    ? `var(${cssVariableName}, ${fallback})`
    : `var(${cssVariableName})`
}

/**
 * 设定CSS Variable
 */
export function setCSSVariable(
  el: HTMLElement | null,
  variableName: string,
  value: number | string | ((original: string) => string | number)
) {
  const willSetValue = isFunction(value) ? value(fromCSSVariable(el, variableName)) : value
  el?.style.setProperty(variableName, `${willSetValue}`)
}

/**
 * 获取CSS Variable
 */
export function fromCSSVariable<T>(
  el: HTMLElement | null,
  variableName: string,
  parser?: (value: string) => T
): T extends Object ? T : string {
  const gettedValue = el?.style.getPropertyValue(variableName) ?? ''
  //@ts-ignore
  return parser ? parser(gettedValue) : gettedValue
}

/**
 * 附加上CSS属性
 * @param el 目标元素
 * @param propertyName 属性名（可能是css variable属性）
 * @param value 属性值
 */
export function setInlineStyle(el: HTMLElement, propertyName: string, value: number | string) {
  el.style.setProperty(propertyName, String(value))
}


