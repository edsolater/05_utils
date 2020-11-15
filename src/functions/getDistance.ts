/**
 * 获取多个点之间的距离的和（至少两个点，否则会取到没有意义的0）
 * @param n1
 * @param n2
 * @example
 * getDistance(3, 4) // 1
 * getDistance(3, 4, 6) // 3
 * getDistance(3, 4, 6, 7) // 4
 */
export default function getDistance(...ns: number[]) {
  let result = 0;
  for (let i = 1; i < ns.length; i++) {
    const pre = ns[i - 1];
    const cur = ns[i];
    result += Math.abs(pre - cur);
  }
  return result;
}
