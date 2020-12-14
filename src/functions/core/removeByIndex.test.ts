import removeByIndex from './removeByIndex'

test('基础案例', () => {
  expect(removeByIndex(['welcome', 'to', 'new', 'world'], 1, 2)).toEqual(['welcome','world'])
})
