/**
 * it is like Python's build-in range
 * @param start start number
 * @param stop stop number
 * @param step (optional, default is 1) will affect output
 * @returns an array of number
 * @example
 * createRange(1, 4) //=> [1, 2, 3, 4]
 * createRange(-1, 4, 3) //=> [-1, 2]
 */

export default function createRange(start: number, stop: number, step = 1): number[] {
  return Array.from(
    {
      length: Math.floor((stop - start) / step) + 1
    },
    (_, i) => start + i * step
  )
}
