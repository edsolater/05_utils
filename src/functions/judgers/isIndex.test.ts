import isIndex from './isIndex'

test('基础案例', () => {
  expect(isIndex(3)).toBe(true)
  expect(isIndex(3.2)).toBe(false)
  expect(isIndex(3, [1, 2])).toBe(false)
  expect(isIndex(1, [1, 2])).toBe(true)
})
