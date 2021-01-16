<template>
  <div class="btn-wrapper">
    <LHButton type="primary" class="join-btn" text="boom" />
    <div class="wave1"></div>
    <div class="wave2"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LHButton from '../baseUI/LHButton.vue'
export default defineComponent({
  components: { LHButton },
})
</script>

<style scoped>
#app .join-btn {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  font-size: 1.3em;
  position: relative;
}
#app .wave1,
#app .wave2 {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 50%;
  z-index: -1;
  background: radial-gradient(
    circle at center,
    transparent 0 50%,
    var(--color-primary) 75%,
    transparent 75%
  );
  animation: radar-wave 1s infinite;
}
#app .wave2 {
  animation-delay: 0.3s;
}

@keyframes radar-wave {
  from {
    opacity: 1;
    transform: scale(0.8);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}
</style>
