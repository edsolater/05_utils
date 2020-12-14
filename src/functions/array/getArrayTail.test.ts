import getArrayTail from './getArrayTail'

test('基础案例', () => {
  expect(getArrayTail([1, 2, 3])).toEqual([2, 3])
})
