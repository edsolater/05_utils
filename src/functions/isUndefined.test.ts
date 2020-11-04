import isUndefined from './isUndefined'

test('基础案例', () => {
  expect(isUndefined(undefined)).toBe(true)
})
