export default function isString(val: unknown): val is string {
  return typeof val === 'string'
}
