import getCSSVariable from './getCSSVariable'
import isFunction from './isFunction'

/**
 * 设定CSS Variable
 */
export default function setCSSVariable(
  el: HTMLElement,
  variableName: string,
  value: number | string | ((original: string) => string | number)
) {
  const willSetValue = isFunction(value) ? value(getCSSVariable(el, variableName)) : value
  el.style.setProperty(variableName, `${willSetValue}`)
}
