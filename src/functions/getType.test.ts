import getType from './getType'

test('基础案例', () => {
  expect(getType({})).toBe('object')
  expect(getType(Object.create(null))).toBe('object')
  expect(getType([])).toBe('array')
  expect(getType(3)).toBe('number')
  // expect(getType(1n)).toBe('bigint')
  expect(getType(Symbol.for('hello'))).toBe('symbol')
  expect(getType(null)).toBe('null')
  expect(getType(undefined)).toBe('undefined')
  expect(getType('xxx')).toBe('string')
  expect(getType(true)).toBe('boolean')
  expect(getType(() => {})).toBe('function')
})
