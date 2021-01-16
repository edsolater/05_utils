/**
 * 判断该字符串是否可被JSON.parse
 * @param jsonString 源
 */
export function isJSON(jsonString: unknown): jsonString is string {
  if (typeof jsonString !== 'string') return false
  else {
    try {
      JSON.parse(jsonString)
      return true
    } catch (e) {
      return false
    }
  }
}
function isObject(value: unknown) {
  if (typeof value === 'object' && value !== null) {
    return true
  }
}
/**
 * 深层次JSON.parse
 * @param jsonString 源
 * @example
 * const source1 = "{\"b\":true,\"a\":\"{\\\"a\\\":1}\"}"
 * console.log(deepJSONParse(source1)) // { b: true, a: { a: 1 } }
 * const source2 = "3"
 * console.log(deepJSONParse(source2)) // 3
 * const source3 = "{\"a\":1}"
 * console.log(deepJSONParse(source3)) // { a: 1 }
 * @todo 没有考虑数组的因素，还是不够健壮的
 */
function deepJSONParse(jsonString: unknown) {
  const parsed = isJSON(jsonString) ? JSON.parse(jsonString) : jsonString
  if (Array.isArray(parsed)) {
    const result: any[] = []
    parsed.forEach((item) => {
      result.push(deepJSONParse(item))
    })
    return result
  } else if (isObject(parsed)) {
    const result = {}
    Object.entries(parsed).forEach(([key, value]) => {
      result[key] = deepJSONParse(value)
    })
    return result
  } else {
    return parsed
  }
}
export default deepJSONParse
