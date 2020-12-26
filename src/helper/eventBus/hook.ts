// 未经过实战检验，且还没写完
/****************************
 *
 * 为什么不直接引入？
 * hook能在组件卸载时执行逻辑，因此可以自动remove注册的事件
 *
 ***************************/

/* -------------------------------- Vue 版 -------------------------------- */
// import { onUnmounted, reactive } from 'vue'
// import { remove } from '.'
// // import { EventListener } from '.'
// export type EventListener = (...args: any[]) => void
// export default function useEventBus() {
//   const listeners = reactive<{fn:EventListener, options:any}[]>([])
//   onUnmounted(() => {
//     listeners.forEach(fn=>remove(fn))
//   })
//   function on(eventName:string,fn, options?: ){
//     listeners.push()

/* -------------------------------- React 版 -------------------------------- */

// import { useRef } from 'react'
// import { emit as emitEventBus } from './core'

// export type EventBus = {
//   loadPage: (name: 'hello') => void
//   loasdf: (woel: 'number') => void
// }

// export function useEventBus<E extends { [eventName: string]: (...args: any[]) => void }>() {
//   const listeners = useRef(new Map<keyof E, E[keyof E]>())
//   function emit(eventName: keyof E) {}
// }
