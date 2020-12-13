/**
 * 无论值怎么变，保证他符号不变，否则就归零（负数依然是负数，正数依然是正数）
 * @param number 值
 * @param sign 符号
 */
export function staySameSign(number: number, sign: number) {
  if (Math.sign(sign) === -1) {
    return number > 0 ? 0 : number;
  } else if (Math.sign(sign) === 1) {
    return number < 0 ? 0 : number;
  } else {
    return 0;
  }
}
