import hasProperty from './hasProperty'

const foo = { a: 3 }
const foo2 = () => {}
foo2.a = 3
test('基础案例', () => {
  expect(hasProperty(foo, 'a')).toBe(true)
  expect(hasProperty(foo, 'b')).toBe(false)
  expect(hasProperty(foo2, 'a')).toBe(true)
})
