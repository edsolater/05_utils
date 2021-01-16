<template>
  <div class="videos-box">
    <LHTransformable class="camera-view" movable resizable shape="circle">
      <LHVideo fit="cover" :srcObject="state.cameraStream" shape="circle" />
    </LHTransformable>
    <StyledButton class="join-btn" v-if="!state.isPlaying" @click="methods.handleClickJoinBtn" />
    <LHTransformable
      class="window-view"
      movable
      resizable
      shape="rect"
      :initPx="{ width: state.initWindowWidth, height: state.initWindowHeight }"
    >
      <LHVideo
        @sourceLoaded="methods.initWindowSize"
        fit="contain"
        :srcObject="state.windowStream"
        shape="auto"
      />
      <div class="user-identity">当前身份：{{ state.userIdentity }}</div>
    </LHTransformable>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import LHTransformable from '../baseUI/LHTransformable.vue'
import LHVideo from '../baseUI/LHVideo.vue'
import StyledButton from './StyledButton.vue'
import { evokeWindow, evokeCamera } from '../helper/evokeMedia'
import { WebRTCIdentity, WebRTCStatus, createConnect } from '../helper/createConnect'
export default defineComponent({
  components: { StyledButton, LHTransformable, LHVideo },
  setup() {
    const state = reactive({
      rtcStatus: 'waiting' as WebRTCStatus,
      userIdentity: 'unknown' as WebRTCIdentity,
      cameraStream: null as MediaStream | null,
      windowStream: null as MediaStream | null,
      initWindowWidth: 0,
      initWindowHeight: 0,
      isPlaying: false,
    })
    const methods = {
      handleClickJoinBtn,
      initWindowSize({ videoWidth = 0, videoHeight = 0 }) {
        const videoRatio = videoWidth / videoHeight
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const viewportRatio = viewportWidth / viewportHeight
        if (videoRatio > viewportRatio) {
          state.initWindowWidth = viewportWidth
          state.initWindowHeight = viewportWidth / videoRatio
        } else {
          state.initWindowHeight = viewportHeight
          state.initWindowWidth = viewportHeight * videoRatio
        }
      },
    }
    function handleClickJoinBtn() {
      state.isPlaying = true
      createConnect({
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
          return evokeWindow({ video: { width: 1920, frameRate: 60 } }).then((stream) => {
            state.isPlaying = true
            if (stream) state.windowStream = stream
            return stream
          })
        },
        onStatusChange(status) {
          state.rtcStatus = status
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

<style scoped>
#app .videos-box {
  height: 100vh;
  display: grid;
  place-items: center;
}
#app .camera-view {
  position: fixed;
  left: 80vw;
  top: 20vh;
  width: 200px;
  height: 200px;
  z-index: 9;
}
#app .camera-view video {
  transform: rotateY(0.5turn);
}
#app .join-btn {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
#app .user-identity {
  position: absolute;
  top: 20px;
  left: 20px;
  color: hsla(0, 0%, 100%, 0.3);
}
#app .window-view {
  --aspect-ratio: calc(16 / 9);
  width: 100vw;
  height: calc(100vw / var(--aspect-ratio, 1.78));
}
#app .blue {
  color: blue;
}
</style>
