import isExist from './isExist'

function isIndex(index: number, ofArr?: any[]): index is number {
  return isExist(ofArr) ? isExist(ofArr[index]) : Number.isInteger(index) && index >= 0
}
export default isIndex
