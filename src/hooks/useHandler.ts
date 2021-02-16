import { useImperativeHandle } from 'react'
import { IRef } from 'typings/reactType'

/**就是useImperativeHandle的一层封装 */
export function useHandler<Handles extends { [handleName: string]: any }>(
  componentRef: IRef<any>,
  handles: Handles
): void {
  useImperativeHandle(componentRef, () => handles)
}
