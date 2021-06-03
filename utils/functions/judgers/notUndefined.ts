type NotUndefined<T> = T extends undefined ? never : T
export default function notUndefined<T>(val: T): val is NotUndefined<T> {
  return val !== undefined
}
