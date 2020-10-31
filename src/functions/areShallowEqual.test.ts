import areShallowEqual from './areShallowEqual'

test('基础案例', () => {
  expect(areShallowEqual([1, 2], [1, 2])).toBe(true)
  expect(areShallowEqual({ a: 2 }, { a: 2 })).toBe(true)
  expect(areShallowEqual({ a: 2 }, { b: 3, d: 5 })).toBe(false)
  expect(areShallowEqual({ a: 2 }, { a: 2, d: 5 })).toBe(false)
  expect(areShallowEqual({ a: 2, d: 5 }, { a: 2 })).toBe(false)
})
