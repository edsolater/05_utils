import { isUndefined } from "lodash"

/**
 * (会更改目标对象)
 * 删除对象的所有undefined属性
 * @param obj 目标对象
 * @todo 可选地提供判定为不必要的判定函数
 */
export default function clearObject<T extends object>(obj: T) {
  const objectEntries = Object.entries(obj)
  for (let i = 0; i < objectEntries.length; i++) {
    const [key, value] = objectEntries[i]
    if (isUndefined(value)) {
      delete obj[key]
    }
  }
}
