export function tryCatch(tryFunction: () => any, catchFunction?: (err: unknown) => any) {
  try {
    tryFunction()
  } catch (err) {
    catchFunction?.(err)
  }
}
