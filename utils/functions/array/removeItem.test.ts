import removeItem from './removeItem'

test('基础案例', () => {
  expect(removeItem(['welcome', 'to', 'new', 'world'], 'new', 'world')).toEqual([
    'welcome',
    'to'
  ])
  expect(removeItem(['welcome', 'to', 'new', 'world'], 'new', 'world', 'hello')).toEqual([
    'welcome',
    'to'
  ])
})
