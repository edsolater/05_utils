/*******************************
 * 实验 draggable list 的
 ******************************/
import Transformable from 'baseUI/Transformable'
import React, { FC, useRef } from 'react'
import { Direction } from 'typings/constants'
import Div from 'baseUI/__Div'
import { createRect, IRect } from 'models/Rect'
import { createMap, IMap } from 'models/Map'

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
// TODO：只有面积到50%了才有动作
function getCollisionArea(rect1: IRect, rect2: IRect) {
  return
}
/**
 * 产生一个函数，鉴定传入的参数是否等于设定的参数
 * @param target
 */
function isEqualTo(target): (value) => boolean {
  return (value) => Object.is(target, value)
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
  const itemData = ['AAA', 'BBB', 'CCC', 'DDD']
  const sizeInfo = useRef<IMap<number, { el: HTMLElement; rect: IRect }>>(createMap())
  return (
    <Div css={{ position: 'absolute', display: 'grid', gap: 8 }}>
      {itemData.map((text, index) => (
        <Transformable
          key={index}
          domRef={(el) =>
            (sizeInfo.current = sizeInfo.current.set(index, {
              el: el,
              rect: createRect(getElementRect(el))
            }))
          }
          moveDirection={direction}
          onMoveStart={(el) => {
            // 用错了，不应该使用intersectionObserverAPI进行拖动重排，因为它只能检测父子级, 而不能检测兄弟组件间的碰撞
            // el.style.setProperty('z-index', '99')
            // const observer = new IntersectionObserver(
            //   (entries, observer) => {
            //     // 为什么一动就触发了呢？ // 原来初次observe时是会触发的
            //     observer.root?.style.border = '2px solid #44aa44'
            //     sortItems(index)
            //     console.log('observer.thresholds: ', observer.thresholds)
            //   },
            //   {
            //     root: el, //root没有生效
            //     rootMargin: '0px',
            //     threshold: 0.5
            //   }
            // )
            // itemEls.current.forEach(itemEl => {
            //   console.log(itemEl)
            //   if (itemEl !== el) observer.observe(itemEl)
            // })
          }}
          onMove={(el, delta) => {
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
              ({ rect }) => rect !== newRect && areInCollision(rect, newRect)
            )
            console.log('collisionElementIndex: ', collisionElementIndex)
          }}
          onMoveEnd={(el) => {
            // el.style.removeProperty('z-index')
          }}
        >
          <Div className='temp-item' css={draggableItemCSS}>
            {text}
          </Div>
        </Transformable>
      ))}
    </Div>
  )
}

export default SortableList
