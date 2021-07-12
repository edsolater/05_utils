/**
 * @example
 * notEmptyObject({}) //=> false
 */
export default function notEmptyObject(target: Record<string, any>): boolean {
  return Boolean(Object.keys(target).length)
}
