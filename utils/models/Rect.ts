import { Delta2dTranslate } from 'typings/constants'
import { Methods, Properties } from 'typings/tools'
import isNumber from '../functions/judgers/isNumber'

export interface IRectProperties {}
export interface IRect {
  readonly _listeners: { [lintenTo: string]: (() => void)[] }
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly left: number
  readonly top: number
  readonly right: number
  readonly bottom: number
  changePosition(delta?: Partial<Delta2dTranslate>): IRect
  /* 用On好像太没有指向性了，可能做成mutable的属性比较好 */
  on(listenTo: Methods<Omit<IRect, 'on'>>, callbackFn): void
}

/**创造一个rect对象，如果信息不全，属性即为0 */
export function createRect(init?: Partial<Pick<IRect, Properties<IRect>>>): IRect {
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
    _listeners: init?._listeners ?? {},
    x: x ?? 0,
    y: y ?? 0,
    width: width ?? 0,
    height: height ?? 0,
    left: x ?? 0,
    top: y ?? 0,
    right: (x ?? 0) + (width ?? 0),
    bottom: (y ?? 0) + (height ?? 0),
    changePosition(delta) {
      rect._listeners['changePosition']?.forEach((cb) => cb())
      return createRect({
        _listeners: rect._listeners,
        width: rect.width,
        height: rect.height,
        x: rect.x + (delta?.dx ?? 0),
        y: rect.y + (delta?.dy ?? 0)
      })
    },
    on: (listenTo, callbackFn) => {
      /* TODO */
      const newRect = createRect({ ...rect, _listeners: {} })
      return newRect
    }
  }
  return rect
}
