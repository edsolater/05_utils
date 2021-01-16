/**
 * (纯函数)
 * 检测目标数是否落在指定范围内
 * @param n 目标数
 * @param range 范围
 * @example
 * inRange(4, [3, 6]) // true
 * inRange(4, [6, 3]) // true
 * inRange(4, [4, 6]) // true
 * inRange(4, [4, 4]) // true
 * inRange(4, [4.1, 5]) // true
 */
export default function inRange(n: number, range: [left: number, right: number]) {
  return range[0] <= n && n <= range[1]
}
