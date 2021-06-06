/**
 * @example
 * isBigInt(2n) //=> true
 * isBigInt(Bigint(3)) //=> true
 * isBigInt('3') //=> false
 */
export default function isBigInt(val: unknown): val is bigint {
  return typeof val === 'bigint'
}
