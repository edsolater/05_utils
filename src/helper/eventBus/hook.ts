// 未经过实战检验，且还没写完
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

//   }
// }
