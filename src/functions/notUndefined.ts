export default function notUndefined(val: unknown): val is undefined {
  return val !== undefined
}
