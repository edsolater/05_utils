import haveEqualKeys from './haveEqualKeys'

test('基础案例', () => {
  expect(haveEqualKeys({ a: 1, b: 2, c: 3 }, { a: 7, b: 8, c: 9 })).toBe(true)
})
