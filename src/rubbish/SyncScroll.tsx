/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FC, useRef } from 'react'

/**
 * 想做个富文本编辑器
 */
const SyncScroll: FC<{}> = ({}) => {
  const aDiv = useRef<HTMLDivElement | null>(null)
  const bDiv = useRef<HTMLDivElement | null>(null)
  const tryToAttachScroll = (a: typeof aDiv, b: typeof bDiv) => {
    a.current?.addEventListener(
      'scroll',
      () => {
        if (a.current && b.current) {
          const aAvaliableScrollDistance = a.current.scrollHeight - a.current.clientHeight
          const bAvaliableScrollDistance = b.current.scrollHeight - b.current.clientHeight
          const targetScrollTop =
            (a.current.scrollTop / aAvaliableScrollDistance) * bAvaliableScrollDistance //FIXME 目前很生硬
          b.current.scrollTo({
            top: targetScrollTop
          })
        }
      },
      { passive: true }
    )
  }
  return (
    <div
      className='outter'
      css={css({
        display: 'flex',
        width: '100%'
      })}
    >
      <div
        ref={el => {
          aDiv.current = el
          tryToAttachScroll(aDiv, bDiv)
        }}
        css={css({
          flex: '1',
          margin: 8,
          backgroundColor: '#eee',
          height: 500,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflow: 'auto',
          div: {
            fontSize: 26
          }
        })}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
        <div>13</div>
        <div>14</div>
        <div>15</div>
        <div>16</div>
        <div>17</div>
        <div>18</div>
        <div>19</div>
        <div>20</div>
        <div>21</div>
        <div>22</div>
        <div>23</div>
        <div>24</div>
        <div>25</div>
        <div>26</div>
        <div>27</div>
        <div>28</div>
        <div>29</div>
        <div>30</div>
        <div>31</div>
        <div>32</div>
        <div>33</div>
        <div>34</div>
        <div>35</div>
        <div>36</div>
      </div>
      <div
        ref={el => {
          bDiv.current = el
          tryToAttachScroll(aDiv, bDiv)
        }}
        css={css({
          flex: '1',
          margin: 8,
          backgroundColor: '#eee',
          height: 500,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflow: 'auto',
          div: {
            fontSize: 48
          }
        })}
      >
        <div>A</div>
        <div>A</div>
        <div>A</div>
        <div>A</div>
        <div>A</div>
        <div>A</div>
        <div>A</div>
        <div>A</div>
        <div>A</div>
        <div>B</div>
        <div>B</div>
        <div>B</div>
        <div>B</div>
        <div>B</div>
        <div>B</div>
        <div>B</div>
        <div>B</div>
        <div>B</div>
        <div>B</div>
        <div>C</div>
        <div>C</div>
        <div>C</div>
        <div>C</div>
        <div>C</div>
        <div>C</div>
        <div>C</div>
        <div>C</div>
        <div>C</div>
        <div>C</div>
        <div>D</div>
        <div>D</div>
        <div>D</div>
        <div>D</div>
        <div>D</div>
        <div>D</div>
        <div>D</div>
      </div>
    </div>
  )
}

export default SyncScroll