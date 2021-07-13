import { MayArray } from 'typings/tools'
import isPrimitive from './isPrimitive'

// it type is not intelligent enough
export default function hasProperty<T>(obj: T, key: MayArray<keyof T | string>) {
  if (isPrimitive(obj)) {
    throw new Error(`input object: ${String(obj)} is not object for fn:${hasProperty.name}`)
  }
  return [key].flat().every((objKey) => Reflect.has(obj as any, objKey))
}
