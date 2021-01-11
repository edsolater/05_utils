/*******************************
 * 实验 draggable list 的
 ******************************/
import Transformable from 'baseUI/Transformable'
import { isElement } from 'lodash'
import React, { FC, Ref, useEffect, useRef } from 'react'
import { Direction } from 'typings/typeConstants'
import Div from '../baseUI/Div'

const draggableItemCSS = {
  padding: 16,
  margin: 8,
  background: 'lightgray'
} as const
// SHUT 用错了，不应该使用dragAndDrop进行拖动重排
const SortableList: FC<{
  direction?: Direction
}> = ({ direction = 'y' }) => {
  const itemData = ['AAAA', 'BBBB', 'CCC', 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD']
  const itemEls = useRef<Map<number, HTMLElement>>(new Map())
  const sizeInfo = useRef<Map<number, DOMRect>>(new Map())
  useEffect(() => {}, [])
  function sortItems(currentIndex: number) {
    console.log('触发了', currentIndex)
  }

  return (
    <Div css={{ position: 'absolute', display: 'grid', gap: 8 }}>
      
      {itemData.map((text, index) => (
        <Transformable
          key={index}
          domRef={el => {
            itemEls.current.set(index, el)
            sizeInfo.current.set(index, el.getBoundingClientRect())
          }}
          moveDirection={direction}
          onMoveStart={el => {
            // 用错了，不应该使用intersectionObserverAPI进行拖动重排，因为它只能检测父子级
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
          onMoveEnd={el => {
            // el.style.removeProperty('z-index')
          }}
        >
          <Div className='temp-item' css={draggableItemCSS} draggable>
            {text}
          </Div>
        </Transformable>
      ))}
    </Div>
  )
}

export default SortableList
