import { Delta2dTranslate } from 'typings/constants'
import isNumber from 'utils/judgers/isNumber'

export interface IRect {
  x: number
  y: number
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
  changePosition(delta?: Partial<Delta2dTranslate>): IRect
}

/**创造一个rect对象，如果信息不全，属性即为0 */
export function createRect(init?: Partial<IRect>): IRect {
  const x =
    init?.x ??
    init?.left ??
    (isNumber(init?.right) && isNumber(init?.width) ? init!.right - init!.width : undefined)
  const y =
    init?.y ??
    init?.top ??
    (isNumber(init?.bottom) && isNumber(init?.height) ? init!.bottom - init!.height : undefined)
  const width = init?.width ?? (isNumber(x) && isNumber(init?.right) ? init!.right - x : undefined)
  const height =
    init?.height ?? (isNumber(x) && isNumber(init?.bottom) ? init!.bottom - x : undefined)
  const rect: IRect = {
    x: x ?? 0,
    y: y ?? 0,
    width: width ?? 0,
    height: height ?? 0,
    left: x ?? 0,
    top: y ?? 0,
    right: (x ?? 0) + (width ?? 0),
    bottom: (y ?? 0) + (height ?? 0),
    changePosition: (delta) =>
      createRect({
        width: rect.width,
        height: rect.height,
        x: rect.x + (delta?.dx ?? 0),
        y: rect.y + (delta?.dy ?? 0)
      })
  }
  return rect
}

class A {
  inner = 'hello'
  foo = () => console.log(this.inner)
}
console.log(A instanceof Function)
