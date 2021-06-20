interface ObjectConstructor {
  keys<T>(o: T): Array<Extract<keyof T, string>>
}
