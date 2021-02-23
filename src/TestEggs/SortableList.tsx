/*******************************
 * 实验 draggable list 的
 ******************************/
import Transformable from 'baseUI/Transformable'
import React, { FC, Ref, useEffect, useRef } from 'react'
import { Direction } from 'typings/constants'
import Div from '../baseUI/__Div'

// ASSUME：假定互相碰撞只有一组元素
function findOverlap<T extends DOMRect>(rectList: Iterable<T>): T[] {
  const allRects = [...rectList]
  const overlapPair: T[] = [allRects[allRects.length - 1]]
  allRects.forEach((rect1, index1) => {
    allRects.slice(index1 + 1).forEach((rect2, index2) => {
      // if (areOverlapped(element1, element2))
    })
  })
  return overlapPair
}
/**判断2个DOMRect是否有重叠 */
function areOverlapped(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  )
}
function getRect(el: HTMLElement): DOMRect {
  return el.getBoundingClientRect()
}
const draggableItemCSS = {
  padding: 16,
  margin: 8,
  background: 'lightgray'
} as const
// SHUT 用错了，不应该使用dragAndDrop进行拖动重排
const SortableList: FC<{
  direction?: Direction
}> = ({ direction = 'y' }) => {
  const itemData = ['AAAA', 'BBBB', 'CCC', 'DDDD']
  const sizeInfo = useRef<Map<HTMLElement, DOMRect>>(new Map())
  return (
    <Div css={{ position: 'absolute', display: 'grid', gap: 8 }}>
      {itemData.map((text, index) => (
        <Transformable
          key={index}
          domRef={(el) => {
            sizeInfo.current.set(el, getRect(el))
          }}
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
            if (sizeInfo.current.has(el)) {
              const oldRect = sizeInfo.current.get(el)!
              const { left, top, right, bottom, x, y } = oldRect
              sizeInfo.current.set(el, {
                ...sizeInfo.current.get(el)!,
                left: left + delta.dx,
                right: right + delta.dx,
                x: x + delta.dx,
                top: top + delta.dy,
                bottom: bottom + delta.dy,
                y: y + delta.dy
              })
            }
            const collapseGroup = findOverlap(sizeInfo.current.values())
            console.log('collapseGroup: ', collapseGroup[0].y)
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
