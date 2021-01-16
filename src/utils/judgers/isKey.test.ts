import isKey from './isKey'

test('基础案例', () => {
  expect(isKey('ksdf')).toBe(true)
  //@ts-ignore
  expect(isKey([3, 4])).toBe(false)
  expect(isKey('ksdf', { a: 1, b: 2 })).toBe(false)
})
