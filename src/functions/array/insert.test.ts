import insert from './insert'

test('基础案例', () => {
  expect(insert(['hello', 'world'], 2, 3, 4)).toEqual(['hello', 'world', 3, 4])
})
