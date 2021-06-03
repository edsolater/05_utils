/**
 * 数组的实际内容是相等的
 */
function arrEqual(arr1, arr2) {
  return sort(arr1).join(' ') === sort(arr2).join(' ')
}
/**
 * @param {any[]} arr 有重复项的数组
 */
function unique(arr, judger = Object.is) {
  return arr.reduce((acc, newItem) => {
    if (acc.some((item) => judger(item, newItem))) return acc
    return [...acc, newItem]
  }, [])
}
/**
 * 数组内数字排序
 */
function sort(arr) {
  return [...arr].sort((a, b) => a - b)
}

