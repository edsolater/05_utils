<template>
  <div ref="videoBoxRef" :class="['video-box', fit, shape]">
    <video ref="videoRef"></video>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch, nextTick } from 'vue'
export default defineComponent({
  props: {
    shape: { type: String as () => 'auto' | 'circle', default: 'auto' },
    fit: { type: String as () => 'cover' | 'contain', default: 'cover' },
    srcObject: MediaStream,
  },
  emits: ['sourceLoaded'],
  setup(props, { emit }) {
    const videoBoxRef = ref<HTMLVideoElement>()
    const videoRef = ref<HTMLVideoElement>()
    onMounted(() => {
      if (props.srcObject) {
        videoRef.value!.srcObject = props.srcObject ?? null
        videoRef.value?.play()
      }
      videoRef.value!.onplaying = () => {
        const videoWidth = videoRef.value?.videoWidth
        const videoHeight = videoRef.value?.videoHeight
        emit('sourceLoaded', { videoWidth, videoHeight })
      }
    })
    watch(
      () => props.srcObject,
      () => {
        videoRef.value!.srcObject = props.srcObject ?? null
        videoRef.value?.play()
      }
    )
    return { videoBoxRef, videoRef }
  },
})
</script>
<style scoped>
.video-box {
  position: relative;
  width: 100%;
  padding-bottom: calc(100% / var(--aspect-ratio, 1.78));
  background: #1d1d1d;
}
.video-box.circle {
  --aspect-ratio: 1;
  border-radius: 1000vw;
  overflow: hidden;
}
.video-box video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-box.contain video {
  object-fit: contain;
}
</style>
