import { IRef } from '../functions/mergeRefs'
import { useImperativeHandle } from 'react'

/**就是useImperativeHandle的一层封装，（因为React的类型提示不行，得自己再封装一次） */
export default function useHandler<Handles extends { [handleName: string]: any }>(
  componentRef: IRef<any>,
  handles: Handles
): void {
  useImperativeHandle(componentRef, () => handles)
}
