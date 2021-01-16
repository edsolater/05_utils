import removeItems from './removeItems'

test('基础案例', () => {
  expect(removeItems(['welcome', 'to', 'new', 'world'], 'new', 'world')).toEqual([
    'welcome',
    'to'
  ])
  expect(removeItems(['welcome', 'to', 'new', 'world'], 'new', 'world', 'hello')).toEqual([
    'welcome',
    'to'
  ])
})
