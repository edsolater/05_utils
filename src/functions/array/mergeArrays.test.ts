import mergeArrays from './mergeArrays'

test('基础案例', () => {
  expect(mergeArrays([1, 2], [1, 2])).toEqual([1, 2, 1, 2])
})
