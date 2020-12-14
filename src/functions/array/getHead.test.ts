import getHead from './getHead'

test('基础案例', () => {
  expect(getHead([1, 2, 3])).toEqual([1, 2])
})
