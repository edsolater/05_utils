<template>
  <div :class="['box', shape]" ref="box">
    <slot></slot>
    <div v-if="resizable" :class="['resize-trigger', shape]" ref="rightBottomTrigger" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { attachPointerMove, attachWheel } from '../helper/attachEventHandler'
import {
  addTransformRule,
  attachSizeIfNeeded,
  changeSizeByDeltaWidth,
  changeTranslateBy,
  setCSSVariable,
} from '../helper/manageCSS'

export default defineComponent({
  props: {
    minWidth: { type: Number, default: 80 },
    maxWidth: { type: Number, default: 5000 },
    // 滚轮与放大缩小的速率的映射
    speed: { type: Number, default: 0.5 },
    movable: Boolean,
    resizable: Boolean,
    size: {
      type: String as () => 'large' | 'middle' | 'small',
      default: 'middle',
    },
    initPx: {
      type: Object as () => { width: number; height: number },
      default: {},
    },
    shape: {
      type: String as () => 'rect' | 'circle',
      default: 'rect',
    },
  },
  setup(props, { slots }) {
    const box = ref<HTMLElement>()
    const rightBottomTrigger = ref<HTMLElement>()
    onMounted(() => {
      if (props.resizable) {
        attachSizeIfNeeded(box.value!)
        attachWheel(box.value!, (ev, deltaY) => {
          changeSizeByDeltaWidth(box.value!, deltaY * props.speed, {
            minWidth: props.minWidth,
            maxWidth: props.maxWidth,
          })
        })
        attachPointerMove(rightBottomTrigger.value!, {
          move: (_, delta) => {
            changeSizeByDeltaWidth(rightBottomTrigger.value!.parentElement!, delta.dx, {
              minWidth: props.minWidth,
              maxWidth: props.maxWidth,
            })
          },
        })
      }
      if (props.movable) {
        addTransformRule(box.value!)
        attachPointerMove(box.value!, { move: (_, delta) => changeTranslateBy(box.value!, delta) })
      }
    })
    const methods = {
      recalcSize({ width, height }) {
        box.value!.style.width = width + 'px'
        box.value!.style.height = height + 'px'
      },
    }
    watch([() => props.initPx.width, () => props.initPx.height], () => {
      if (props.initPx.width && props.initPx.height) {
        methods.recalcSize({ width: props.initPx.width, height: props.initPx.height })
      }
    })
    return { box, rightBottomTrigger, methods }
  },
})
</script>

<style scoped>
.box {
  display: grid;
}
.box:hover {
  box-shadow: 0px 0px 0px 2px rgba(30, 143, 255, 0.219);
}
.box.circle {
  border-radius: 1000vw;
}
.box:hover .resize-trigger {
  opacity: 1;
}
.resize-trigger {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 8px;
  height: 8px;
  opacity: 0;
  background: dodgerblue;
  border-radius: 50%;
  cursor: nw-resize;
  transform: translate(50%, 50%);
  transition: 200ms;
}
.resize-trigger:hover {
  transform: translate(50%, 50%) scale(2);
}
.resize-trigger.circle {
  right: 14.625%;
  bottom: 14.625%;
}
</style>
