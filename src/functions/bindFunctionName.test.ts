import bindFunctionName from './bindFunctionName'
const testFn = () => {}

test('基础案例', () => {
  const namedFn = bindFunctionName(testFn, 'test')
  expect(namedFn.name).toBe('test')
})
