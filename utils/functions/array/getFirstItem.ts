/**
 * @example
 * getFirstItem([2,3]) //=> 2
 */
export default function getFirstItem<T>(arr: T[]): T | undefined {
  return arr[0]
}
