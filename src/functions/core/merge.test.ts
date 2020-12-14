import merge from './merge'
test('基础案例', () => {
  expect(merge([1, 2], [1, 2])).toEqual([1, 2, 1, 2])
  expect(merge({ a: 1, b: 2 }, { c: 3, d: 4 })).toEqual({ a: 1, b: 2, c: 3, d: 4 })
})
