import { objectFilter } from 'functions'


/**
 * 
 * @param obj 
 * @param propNameList 
 */
export default function discardPropertyNames<T extends object>(
  obj: T,
  propNameList: Array<keyof T | string>
) {
  return objectFilter(obj, ([key]) => !propNameList.includes(key))
}
