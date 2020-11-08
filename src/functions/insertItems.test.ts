import insertItems from './insertItems'

test('基础案例', () => {
  expect(insertItems(['hello', 'world'], 2, 3, 4)).toEqual(['hello', 'world', 3, 4])
})
