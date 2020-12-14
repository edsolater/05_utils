import insertEntries from './insertEntries'

test('基础案例', () => {
  const newLocal = insertEntries({ a: 1, b: 2 }, ['c', 'hello'], ['d', 'world'])
  expect(newLocal).toEqual({ a: 1, b: 2, c: 'hello', d: 'world' })
})
