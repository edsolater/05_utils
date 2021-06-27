import { createRef } from 'react';

export default function createCallbackRef<T = unknown>(callback: (current: T) => void) {
  const originalRef = createRef<T>();
  const proxied = new Proxy(originalRef, {
    set(target, p, value) {
      callback(value);
      return Reflect.set(target, p, value);
    }
  });
  return proxied;
}
