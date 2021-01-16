import merge from './merge'

test('基础案例', () => {
  expect(merge([1, 2], [1, 2])).toEqual([1, 2, 1, 2])
})
