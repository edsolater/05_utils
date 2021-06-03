import isExist from './isExist'

function isIndexNumber(n: number): boolean {
  return Number.isInteger(n) && n >= 0
}
function isIndex(index: number, ofArr?: any[]): index is number {
  return isIndexNumber(index) && (isExist(ofArr) ? index < ofArr?.length : true)
}
export default isIndex
