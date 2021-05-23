import inArray from './inArray'

export default function inEnum<T>(detectValue: unknown, arr: ReadonlyArray<T>): detectValue is T {
  //@ts-ignore
  return inArray(detectValue, arr)
}
