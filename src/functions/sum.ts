/**
 * 取和
 * @param numberArr 需要求和的数组
 * @example
 * sum(3, 4) // 7
 */
export default function sum(...numberArr: number[]) {
  return numberArr.reduce((a, b) => a + b, 0)
}
