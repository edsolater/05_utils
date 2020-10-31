import areShallowEqualArray from './areShallowEqualArray'

test('基础案例', () => {
  expect(areShallowEqualArray([1, 2], [1, 2])).toBe(true)
  expect(areShallowEqualArray([1, 2], [1, 3])).toBe(false)
  expect(areShallowEqualArray([], [])).toBe(true)
  expect(areShallowEqualArray([1, 2], [1, 2, 4])).toBe(false)
  expect(areShallowEqualArray([1, 2, []], [1, 2, []])).toBe(false)
})
