import removeByItems from './removeByItems'

test('基础案例', () => {
  expect(removeByItems(['welcome', 'to', 'new', 'world'], 'new', 'world')).toEqual([
    'welcome',
    'to'
  ])
  expect(removeByItems(['welcome', 'to', 'new', 'world'], 'new', 'world', 'hello')).toEqual([
    'welcome',
    'to'
  ])
})
