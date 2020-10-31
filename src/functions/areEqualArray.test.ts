import areEqualArray from './areEqualArray'

test('基础案例', () => {
  expect(areEqualArray([1, 2], [1, 2])).toBe(true)
  expect(areEqualArray([1, 2], [1, 3])).toBe(false)
  expect(areEqualArray([], [])).toBe(true)
  expect(areEqualArray([1, 2], [1, 2, 4])).toBe(false)
  expect(areEqualArray([1, 2, []], [1, 2, []])).toBe(false)
})
