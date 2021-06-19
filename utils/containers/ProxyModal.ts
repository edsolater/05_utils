/**
 * the object contained in {@link ProxyModal this function} will return a proxied object.
 * Any access(property / methods) will return a promise. 
 * Any set will be recorded when true data is not ready.
 * if data is not loaded, this proxied object will fetch data in the background.
 * 
 */


// IDEA: 感觉要包装成一个hook，方便调用
/**
 * main function
 */
function ProxyModal(target) {
  let loadData
  return new Proxy(target, {
    set(target, propertyName, value){
      return new Promise.resolve(loadData[propertyName])
    }
  })
}