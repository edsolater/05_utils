import divideByPropertyNames from './divideByPropertyNames'

test('基础案例', () => {
  expect(divideByPropertyNames({ a: 1, hello: 2 }, ['a'])).toEqual([{ a: 1 }, {hello:2}])
})
