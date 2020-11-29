/** TODO */
/** 防抖（前置型） */
export default function debounce<F extends (...args: any[]) => any>(fn: F): F {
  let lastInvokedTime = 0
  const errorRateTime = 400 // (防抖)的容错时间
  //@ts-ignore
  return (...args) => {
    const currentTime = Date.now()
    if (currentTime - lastInvokedTime > errorRateTime) {
      lastInvokedTime = currentTime
      return fn(...args)
    }
  }
}