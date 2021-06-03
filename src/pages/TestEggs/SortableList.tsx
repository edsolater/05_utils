/*******************************
 * 实验 draggable list 的
 ******************************/
import Transform from 'baseUI/Transform'
import React, { FC, useRef } from 'react'
import { Direction } from 'typings/constants'
import Div from 'baseUI/Div'
import { createRect, IRect } from 'models/Rect'
import { createMap, IMap } from 'models/Map'
import changeTransform from 'helper/manageStyle/changeTransform'
import { deleteElementStyle, setElementStyle } from 'helper/manageStyle/elementStyle'

/**基础方法 */
function findKeyByMapValue<K, V>(
  map: HasEntriesMethod<K, V>,
  callbackfn: (value: V, key: K, originMap: HasEntriesMethod<K, V>) => boolean
): K | undefined {
  for (const [key, value] of map.entries()) {
    if (callbackfn(value, key, map)) return key
  }
}
/**基础方法 */
function findEntryByMapValue<K, V>(
  map: HasEntriesMethod<K, V>,
  callbackfn: (value: V, key: K, originMap: HasEntriesMethod<K, V>) => boolean
): [K, V] | undefined {
  for (const [key, value] of map.entries()) {
    if (callbackfn(value, key, map)) return [key, value]
  }
}
/**判断2个DOMRect是否有重叠 */
function areInCollision(rect1: IRect, rect2: IRect) {
  return (
    rect1.left < rect2.right &&
    rect2.left < rect1.right &&
    rect1.top < rect2.bottom &&
    rect2.top < rect1.bottom
  )
}

interface CollisionInfo {
  hasCollision: boolean
  collisionArea: number
  colllisionPercent: number
}

// TODO：获取重合的信息。面积到rect1的50%了才有动作
/**@see https://aotu.io/notes/2017/02/16/2d-collision-detection/index.html */
function getCollisionInfo(rect1: IRect, rect2: IRect): CollisionInfo {
  if (areInCollision(rect1, rect2)) {
    const xBorder = [rect1.left, rect1.right, rect2.left, rect2.right].sort((a, b) => a - b)
    const yBorder = [rect1.top, rect1.bottom, rect2.top, rect2.bottom].sort((a, b) => a - b)
    const collisionArea = Math.abs((xBorder[1] - xBorder[2]) * (yBorder[1] - yBorder[2]))
    const rect1Area = Math.abs((rect1.right - rect1.left) * (rect1.bottom - rect1.top))
    const collisionPercent = collisionArea / rect1Area
    console.log('collisionPercent: ', collisionPercent) // 正常
    return { hasCollision: true, collisionArea, colllisionPercent: collisionPercent }
  }
  return { hasCollision: false, colllisionPercent: 0, collisionArea: 0 }
}
/**
 * 产生一个函数，鉴定传入的参数是否等于设定的参数
 * @param target
 */
function isEqualTo(target): (value) => boolean {
  const _isEqualTo: (value: any) => boolean = (value) => Object.is(target, value)
  return _isEqualTo
}

function getElementRect(el: HTMLElement): DOMRect {
  return el.getBoundingClientRect()
}
const draggableItemCSS = {
  padding: 16,
  background: 'lightgray'
} as const
// SHUT 用错了，不应该使用dragAndDrop进行拖动重排
const SortableList: FC<{
  direction?: Direction
}> = ({ direction = 'y' }) => {
  const itemData = ['0', '1', '2', '3', '4', '5']
  type ItemInfo = {
    el: HTMLElement
    rect: IRect
    // 因临时重排，而产生的位移（最终重排时根据这个属性来）(与重排方向强相关)
    sortMove?: number
  }

  const sizeInfo = useRef<IMap<number, ItemInfo>>(createMap())
  return (
    <Div css={{ position: 'absolute', display: 'grid' }}>
      {itemData.map((text, index) => (
        <Transform
          key={index}
          domRef={(el) =>
            sizeInfo.current.set(index, {
              el: el,
              rect: createRect(getElementRect(el))
            })
          }
          direction={direction}
          onMoveStart={({el}) => setElementStyle(el, 'z-index', '1')}
          onMove={({el:movingElement, delta}) => {
            let newRect: IRect
            sizeInfo.current = sizeInfo.current.set(index, ({ el, rect: oldRect }) => {
              newRect = oldRect.changePosition(delta)
              return {
                el,
                rect: newRect
              }
            })
            //找重叠的
            // ASSUME：假定互相碰撞只有一组元素
            const collisionElementIndex = findKeyByMapValue(
              sizeInfo.current,
              ({ rect }) =>
                rect !== newRect && getCollisionInfo(rect, newRect).colllisionPercent > 0.6
            )
            console.log('collisionElementIndex: ', collisionElementIndex)

            if (!collisionElementIndex) return

            // 计算当前element本应该所处的index
            const movingElementShouldIndex = collisionElementIndex
            const movingElementCurrentIndex = index
            const moveDirection = movingElementShouldIndex - movingElementCurrentIndex

            sizeInfo.current.forEach((info, itemIndex, map) => {
              if (itemIndex === movingElementCurrentIndex) return

              const shouldFloat =
                itemIndex >= Math.min(movingElementShouldIndex, movingElementCurrentIndex) &&
                itemIndex <= Math.max(movingElementShouldIndex, movingElementCurrentIndex) // FIXME: 回程时不应该shouldFloat的，shouldFloat了

              const dyForReset = info.sortMove ? -info.sortMove : 0 // 复原未移动时的位置
              const dyForSort = shouldFloat ? Math.sign(moveDirection * -1) * info.rect.height : 0 // 重排
              const delta = { dy: dyForReset + dyForSort }
              map.set(itemIndex, ({ rect, ...rest }) => ({
                ...rest,
                rect: rect.changePosition(delta),
                sortMove: dyForSort
              }))
              changeTransform(info.el, { translate: delta, transition: 200 })
            })
          }}
          onMoveEnd={({el}) => deleteElementStyle(el, 'z-index')}
        >
          <Div className='temp-item' css={draggableItemCSS}>
            {text}
          </Div>
        </Transform>
      ))}
    </Div>
  )
}

export default SortableList
