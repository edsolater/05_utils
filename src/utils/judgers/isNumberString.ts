function isNumberString(val: any): boolean {
  if (typeof val !== 'string') return false
  return '' + Number(val) === val
}
export default isNumberString
