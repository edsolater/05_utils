import notNullish from './notNullish'

export default function isNullish<T>(value: T): value is T extends null | undefined ? T : never {
  return !notNullish(value)
}
