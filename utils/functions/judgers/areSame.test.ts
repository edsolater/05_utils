import areSame from './areSame'

test('基础案例', () => {
  expect(areSame(1, 1)).toBe(true)
  expect(areSame(1, 1, 1)).toBe(true)
  expect(areSame(1, 2)).toBe(false)
  expect(areSame(1, 1, 2)).toBe(false)
  expect(areSame([1, 2], [1, 2])).toBe(false)
})
