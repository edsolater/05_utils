//get 请求
export async function get(
  url: string,
  params?: {
    [param: string]: any
  }
) {
  console.log('url: ', url)
  if (params) {
    const paramsArray: string[] = []
    //拼接参数
    Object.keys(params).forEach((key) =>
      paramsArray.push(key + '=' + encodeURI(params[key].toString()))
    )

    if (paramsArray.length > 0) {
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
  }
  const res = await fetch(url)
  return await res.json()
}
//post 请求
export async function post(url: string, data: any) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await res.json()
}
