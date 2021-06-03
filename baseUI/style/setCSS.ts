/**
 * 附加上CSS属性
 * @param el 目标元素
 * @param propertyName 属性名（可能是css variable属性）
 * @param value 属性值
 */
export const setInlineStyle = (el: HTMLElement, propertyName: string, value: number | string) =>
  el.style.setProperty(propertyName, String(value))

/**
 * 批量附加上CSS属性
 * @param el 目标元素
 * @param propertyName 属性名（可能是css variable属性）
 * @param value 属性值
 */
export const setLotCss = (
  el: HTMLElement,
  propertySet: [propertyName: string, value: number | string][]
) => propertySet.forEach(([propertyName, value]) => setInlineStyle(el, propertyName, value))
// TODO: 后一个需要用overload合并
