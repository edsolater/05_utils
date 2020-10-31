import areShallowEqualObject from './areShallowEqualObject'

test('基础案例', () => {
  expect(areShallowEqualObject({ a: 1 }, { a: 1 })).toBe(true)
  expect(areShallowEqualObject({ a: 1 }, { a: 1, b: 2 })).toBe(false)
  expect(areShallowEqualObject([1], [1])).toBe(true)
  expect(areShallowEqualObject([1], [2])).toBe(false)
})
