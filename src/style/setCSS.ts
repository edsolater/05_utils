import isHTMLElement from 'helper/domElement/isHTMLElement'

/**
 * 附加上CSS属性
 * @param el 目标元素
 * @param propertyName 属性名（可能是css variable属性）
 * @param value 属性值
 */
export const setCss = (el: HTMLElement, propertyName: string, value: number | string) =>
  el.style.setProperty(propertyName, value.toString())

/**
 * 批量附加上CSS属性
 * @param el 目标元素
 * @param propertyName 属性名（可能是css variable属性）
 * @param value 属性值
 */
export const setLotCss = (
  el: HTMLElement,
  propertySet: [propertyName: string, value: number | string][]
) => propertySet.forEach(([propertyName, value]) => setCss(el, propertyName, value))
