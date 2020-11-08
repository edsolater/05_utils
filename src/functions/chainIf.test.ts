import chainIf from './chainIf'

test('基础案例', () => {
  expect(chainIf([2 > 1, 'hello'])).toBe('hello')
  expect(chainIf([2 < 1, 'hello'], 'world')).toBe('world')
  expect(chainIf([2 < 1, 'hello'], 'world', [2 < 4, 'hello'])).toBe('world')
  expect(chainIf([2 < 1, 'hello'], [2 < 4, 'hello'], 'world')).toBe('hello')
})
