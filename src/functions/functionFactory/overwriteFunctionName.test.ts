import overwriteFunctionName from '../object/overwriteFunctionName'
const testFn = () => {}

test('基础案例', () => {
  const namedFn = overwriteFunctionName(testFn, 'test')
  expect(namedFn.name).toBe('test')
})
