import parallelIf from './parallelIf'

test('基础案例', () => {
  expect(parallelIf([2 > 1, 'hello'])).toBe('hello')
  expect(parallelIf([2 < 1, 'hello'], 'world')).toBe('world')
  expect(parallelIf([2 < 1, 'hello'], 'world', [2 < 4, 'hello'])).toBe('world')
  expect(parallelIf([2 < 1, 'hello'], [2 < 4, 'hello'], 'world')).toBe('hello')
})
