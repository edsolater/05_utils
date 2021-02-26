interface HasAllIteratorMethod<Key = unknown, Value = any> {
  //TODO
}
interface HasEntriesMethod<K, V> {
  entries(): IterableIterator<[K, V]>
}
