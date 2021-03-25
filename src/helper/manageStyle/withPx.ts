/**
 * @todo 要默认单位是px，且默认输入的数字也是px。以后要更灵活
 */
export function fromPx(str: string) {
  return Number.parseFloat(str)
}

/**
 * @todo 要默认单位是px，且默认输入的数字也是px。以后要更灵活
 */
export function toPx(n: number | number[]) {
  const mapToPx = (n: number) => `${n}px`
  return typeof n === 'number' ? mapToPx(n) : n.map(mapToPx).join(' ')
}
