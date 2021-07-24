// to check if in brower.
export default function checkInBrowserMainThread() {
  return Reflect.has(globalThis, 'document')
}
