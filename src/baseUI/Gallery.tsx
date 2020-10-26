import isNullish from 'functions/typeGards/isNullish'
import React, { useRef, useState } from 'react'
import './Gallery.scss'

/**
 * 类似于notion的database的 “Gallary” 模式
 */
const Gallery = (props: {
  data: {
    tabName: string
    entries: {
      name: string
      pic?: string
      link?: string
    }[]
  }[]
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const indicatorRef = useRef(document.createElement('div'))
  const entryGrids = useRef(
    Array.from({ length: props.data.length }, () => document.createElement('div'))
  )
  const sizeInfo = useRef({
    totalWidth: 0,
    eachGridWidth: 0
  })
  const showTab = (tabIndex = 0) => {
    entryGrids.current[tabIndex].scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className='tab-box'>
      <div className='tabs'>
        {props.data.map((item, tabIndex) => (
          <div
            key={tabIndex}
            className={`tab-name ${tabIndex === activeTabIndex ? 'active' : ''}`}
            onClick={() => {
              showTab(tabIndex)
            }}
          >
            {item.tabName}
          </div>
        ))}
        <div
          className='active-indicator'
          ref={indicatorRef}
          //@ts-expect-error
          style={{ '--tab-count': props.data.length }}
        ></div>
      </div>
      <div
        ref={el => {
          if (isNullish(el)) return
          if (sizeInfo.current.totalWidth) return
          sizeInfo.current.totalWidth = el.scrollWidth
          sizeInfo.current.eachGridWidth = el.scrollWidth / props.data.length
        }}
        className='tab-entries'
        onScroll={e => {
          indicatorRef.current.style.left = `${
            (e.target as HTMLDivElement).scrollLeft / props.data.length
          }px`
          const newActiveIndex = Math.round(
            (e.target as HTMLDivElement).scrollLeft / sizeInfo.current.eachGridWidth
          )
          if (activeTabIndex !== newActiveIndex) setActiveTabIndex(newActiveIndex)
        }}
      >
        {props.data.map((item, tabIndex) => (
          <div
            className='entry-grid'
            key={tabIndex}
            ref={el => el && (entryGrids.current[tabIndex] = el)}
          >
            {item.entries.map((entry, entryIndex) => (
              <a className='entry-item' key={`${tabIndex}-${entryIndex}`} href={entry.link}>
                <img className='thumbnail' src={entry.pic}></img>
                <div className='entry-name'>{entry.name}</div>
              </a>
            ))}
          </div>
        ))}
      </div>
      <div
        className='left-entry-grid-arrow'
        onClick={() => {
          const newTabIndex = activeTabIndex - 1
          showTab((newTabIndex + props.data.length) % props.data.length)
        }}
      ></div>
      <div
        className='right-entry-grid-arrow'
        onClick={() => {
          const newTabIndex = activeTabIndex + 1
          showTab((newTabIndex + props.data.length) % props.data.length)
        }}
      ></div>
    </div>
  )
}

export default Gallery
