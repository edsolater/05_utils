
/**
 * 设定element的style
 * !!!注意要用 kebab-case
 * @param el
 * @param style
 */
export function setElementStyle(el: HTMLElement, propName: string, value: string | number) {
  el.style.setProperty(propName, typeof value === 'number' ? value + 'px' : `${value}`)
}
// /**
//  * 设定element的style
//  * @param el
//  * @param style
//  */
// export function getElementStyle(el: HTMLElement,opts:{type?:'inline'|'computed'}) {
//     el.style.setProperty(propName, typeof value === 'number' ? value + 'px' : value)
// }

// /**
//  * 设定element的style
//  * @param el
//  * @param style
//  */
// export function hasElementStyle(el: HTMLElement, style: CSSProperties) {
//   for (const [propName, value] of Object.entries(style)) {
//     el.style.setProperty(propName, typeof value === 'number' ? value + 'px' : value)
//   }
// }
export function deleteElementStyle(el: HTMLElement, propName: string) {
  el.style.setProperty(propName, '')
}
