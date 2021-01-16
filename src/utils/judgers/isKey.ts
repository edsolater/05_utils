import isExist from './isExist'
import isInterger from './isInterger'
import isString from './isString'
import isSymbol from './isSymbol'
function isKey(key: keyof any, ofObj?: object): key is keyof any {
  return isExist(ofObj) ? isExist(ofObj[key]) : isString(key) || isInterger(key) || isSymbol(key)
}
export default isKey
