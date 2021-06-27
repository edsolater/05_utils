import { omit } from 'utils/functions/object'

export default function dropChildren(props: Record<string, any>) {
  return omit(props, 'children')
}
