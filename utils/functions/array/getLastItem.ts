/**
 * @example
 * getLastItem([2,3]) //=> 3
 */
export default function getLastItem<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[arr.length - 1] : undefined
}
