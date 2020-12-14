import getArrayHead from './getArrayHead'

test('基础案例', () => {
  expect(getArrayHead([1, 2, 3])).toEqual([1, 2])
})
