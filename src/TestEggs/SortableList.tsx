/*******************************
 * 实验 draggable list 的
 ******************************/
import Transformable from 'baseUI/Transformable'
import React, { FC, useRef } from 'react'
import { Direction } from 'typings/constants'
import Div from 'baseUI/__Div'
import { createRect, IRect } from 'models/Rect'

// ASSUME：假定互相碰撞只有一组元素
function findCollision<T extends IRect>(rectList: Iterable<T>, positiveRect: T): T | undefined {
  for (const [idx, rect] of [...rectList].entries()) {
    if (rect !== positiveRect && areInCollision(rect, positiveRect)) {
      return rect
    }
  }
}
/**基础方法 */
function findByMapValue<K, V>(map: Map<K, V>, callbackfn: (value: V) => boolean): K | undefined {
  for (const [key, value] of map.entries()) {
    if (callbackfn(value)) return key
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
  const sizeInfo = useRef<Map<HTMLElement, IRect>>(new Map())
  return (
    <Div css={{ position: 'absolute', display: 'grid', gap: 8 }}>
      {itemData.map((text, index) => (
        <Transformable
          key={index}
          domRef={(el) => sizeInfo.current.set(el, createRect(getElementRect(el)))}
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
            //IDEA: 干嘛要反复写sizeInfo.current, 是不是原生Map的api太冗余了，得自定义
            if (sizeInfo.current.has(el)) {
              const rect = sizeInfo.current.get(el)!
              sizeInfo.current.set(el, rect.changePosition(delta))
            }
            const collisionRect = findCollision(
              sizeInfo.current.values(),
              sizeInfo.current.get(el)!
            )
            const collisionElement = findByMapValue(sizeInfo.current, (v) => v === collisionRect)
            console.log('conllisionElement: ', collisionElement)
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
