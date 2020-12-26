import { emit, on } from '.'

/**
 * 正常使用
 */
on('hello', () => console.log(3))
emit('hello') // 3
emit('hello') // 3

/* -------------------------------------------------------------------------- */

/**
 * 使用 {once}
 */
on('world', () => console.log(4), { once: true })
emit('world') // 4
emit('world') // 因为once，就只会触发一次

/* -------------------------------------------------------------------------- */

/**
 * 允许延迟调用
 */
emit('dd')
on('dd', () => console.log(5)) // 5

/**
 * 关闭延迟调用
 */
emit('df')
on('df', () => console.log(6), { flush: 'normal' })
