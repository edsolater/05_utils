调用示例：

```vue
<template>
  <div class="videos-box">
    <LHVideo fit="cover" :srcObject="state.cameraStream" shape="circle" />
    <button class="join-btn" v-if="!state.isPlaying" @click="methods.handleClickJoinBtn" />
    <LHVideo
      @sourceLoaded="methods.initWindowSize"
      fit="contain"
      :srcObject="state.windowStream"
      shape="auto"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import LHVideo from '../baseUI/LHVideo.vue'
import { evokeWindow, evokeCamera } from '../helper/evokeMedia'
import { WebRTCIdentity, WebRTCStatus, createPeerConnection } from '../helper/createPeerConnection'
export default defineComponent({
  components: { LHVideo },
  setup() {
    const state = reactive({
      userIdentity: 'unknown' as WebRTCIdentity,
      cameraStream: null as MediaStream | null,
      windowStream: null as MediaStream | null,
      isPlaying: false,
    })
    const methods = {
      handleClickJoinBtn,
    }
    function handleClickJoinBtn() {
      state.isPlaying = true
      createPeerConnection({
        onPrintRemoteCamera(stream) {
          state.cameraStream = stream
        },
        onPrintRemoteWindow(stream) {
          state.isPlaying = true
          state.windowStream = stream
        },
        openLocalCamera() {
          return evokeCamera().then((stream) => {
            if (stream) state.cameraStream = stream
            return stream
          })
        },
        openLocalWindow() {
          return evokeWindow().then((stream) => {
            state.isPlaying = true
            if (stream) state.windowStream = stream
            return stream
          })
        },
        onIdentityChange(identity) {
          state.userIdentity = identity
        },
      })
    }

    return {
      state,
      methods,
    }
  },
})
</script>
```
