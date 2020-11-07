import mergeObjects from './mergeObjects'

test('基础案例', () => {
  expect(mergeObjects({ a: 1, b: 2 }, { c: 3, d: 4 })).toEqual({ a: 1, b: 2, c: 3, d: 4 })
})
