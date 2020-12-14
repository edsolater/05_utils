import getProperty from './getProperty'

test('基础案例', () => {
  expect(getProperty({ a: 3, b: true }, 'c', 4)).toBe(4)
  expect(getProperty({ a: 3, b: true }, 'c')).toBe(undefined)
  expect(getProperty({ a: 3, b: true }, 'a')).toBe(3)
})
