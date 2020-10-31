import isFalsy from './isFalsy'

test('基础案例', () => {
  expect(isFalsy(0)).toBe(true)
  expect(isFalsy('')).toBe(true)
  expect(isFalsy('{ a: 2 }, { b: 3, d: 5 })')).toBe(false)
})
