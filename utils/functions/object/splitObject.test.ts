import splitObject from './splitObject'

test('基础案例', () => {
  expect(splitObject({ a: 1, hello: 2 }, ['a'])).toEqual([{ a: 1 }, {hello:2}])
})
