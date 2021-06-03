import remove from './remove'

test('基础案例', () => {
  expect(remove(['welcome', 'to', 'new', 'world'], 1, 2)).toEqual(['welcome','world'])
})
