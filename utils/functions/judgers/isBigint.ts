/**
 * @example
 * isBigint(2n) //=> true
 * isBigint(Bigint(3)) //=> true
 * isBigint('3') //=> false
 */
export default function isBigint(val: unknown): val is bigint {
  return typeof val === 'bigint'
}
