import { omit } from '@edsolater/fnkit/dist/object'

export default function dropChildren(props: Record<string, any>) {
  return omit(props, 'children')
}
