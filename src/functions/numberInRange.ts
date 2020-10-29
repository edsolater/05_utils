export default function numberInRange(n: number, range: [left: number, right: number]) {
  return range[0] <= n && n <= range[1]
}
