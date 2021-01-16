export default function isItemOf<T>(value: T, arr: T[]) {
  return arr.includes(value)
}
