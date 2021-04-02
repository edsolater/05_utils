import { IRef } from 'baseUI/Div/util/mergeRefs'
import { useImperativeHandle } from 'react'

/**就是useImperativeHandle的一层封装，（因为React的类型提示不行，得自己再封装一次） */
export function useComponentRefHandler<Handles extends { [handleName: string]: any }>(
  componentRef: IRef<any>,
  handles: Handles
): void {
  useImperativeHandle(componentRef, () => handles)
}
