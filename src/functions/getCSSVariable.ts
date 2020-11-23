/**
 * 获取CSS Variable
 */
export default function getCSSVariable<T>(
  el: HTMLElement,
  variableName: string,
  parser?: (value: string) => T
): T extends Object ? T : string {
  const gettedValue = el.style.getPropertyValue(variableName)
  //@ts-ignore
  return parser ? parser(gettedValue) : gettedValue
}
