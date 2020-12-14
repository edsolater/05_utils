import getTail from './getTail'

test('基础案例', () => {
  expect(getTail([1, 2, 3])).toEqual([2, 3])
})
