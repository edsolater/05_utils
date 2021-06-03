import objectMinus from './objectMinus'

test('基础案例', () => {
  const objA = objectMinus({ a: 1, b: 2 }, 'a')
  const objB = objectMinus({ a: 1, b: 2, c: true }, ['a', 'c'])
  const objC = objectMinus({ a: 1, b: 2 }, { a: 1 })

  expect(objA).toEqual({ b: 2 })
  expect(objB).toEqual({ b: 2 })
  expect(objC).toEqual({ b: 2 })
})
