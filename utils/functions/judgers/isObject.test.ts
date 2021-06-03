import isObject from './isObject'

test('基础案例', () => {
  expect(isObject({})).toBe(true)
  expect(isObject(Object.create(null))).toBe(true)
  expect(isObject(null)).toBe(false)
})
