import _getType from './_getType'

test('基础案例', () => {
  expect(_getType({})).toBe('object')
  expect(_getType(Object.create(null))).toBe('object')
  expect(_getType([])).toBe('array')
  expect(_getType(3)).toBe('number')
  // expect(getType(1n)).toBe('bigint')
  expect(_getType(Symbol.for('hello'))).toBe('symbol')
  expect(_getType(null)).toBe('null')
  expect(_getType(undefined)).toBe('undefined')
  expect(_getType('xxx')).toBe('string')
  expect(_getType(true)).toBe('boolean')
  expect(_getType(() => {})).toBe('function')
})
