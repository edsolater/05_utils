type Requests = [
  {
    path: '/login'
    method: 'GET'
    params: {
      userName: string
    }
  },
  {
    path: '/login3'
    method: 'GET'
    params: {
      id: number
    }
    res: {
      words: string[]
    }
  },
  {
    path: '/login2'
    method: 'POST'
    params: {
      title: string
    }
    res: {}
  }
]

type ChooseGetRequests<T, P = T[number], U = P['method']> = U extends Extract<U, 'GET'>
  ? P extends { type: U }
    ? P
    : never
  : never
type GetFromPath<P, Item = Requests[number]> = Item extends { path: P } ? Item : never

function makeRequest<T extends Requests[number]['path']>(
  path: T,
  params: GetFromPath<T>['params'],
  cb: (res: GetFromPath<T>['res']) => void
) {}
makeRequest('/login3', {}, res => {
  res
})
