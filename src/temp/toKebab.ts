function toKebab(prop: string) {
  return prop.replace(/[A-Z]/g, '-$&').toLowerCase()
}

console.log(toKebab('helloWorldisdfI'))