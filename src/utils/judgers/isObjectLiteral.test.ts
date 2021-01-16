import isObjectLiteral from './isObjectLiteral'

test('基础案例', () => {
  expect(isObjectLiteral({})).toBe(true)
  expect(isObjectLiteral(Object.create(null))).toBe(true)
  expect(isObjectLiteral(null)).toBe(false)
})
