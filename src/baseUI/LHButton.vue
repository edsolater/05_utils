<template>
  <div
    :class="[
      'lh_button',
      {
        'lh_button--no-icon': !icon,
        'lh_button--disabled': disabled,
        'lh_button--no-bold': noBold,
        'lh_button--primary': type === 'primary',
        'lh_button--muted': type === 'muted',
        'lh_button--light': type === 'light',
        'lh_button--border': type === 'border',
        'lh_button--text': type === 'text',
        'lh_button--small': size === 'small',
        'lh_button--middle': size === 'middle',
        'lh_button--large': size === 'large',
        'lh_button--capsule': shape === 'capsule',
      },
    ]"
  >
    <!-- <LHIcon
      v-if="icon"
      :name="icon"
      :color="
        iconColor
          ? iconColor
          : type === 'primary'
          ? '#ffffff'
          : type === 'light'
          ? '#757575'
          : type === 'text'
          ? 'currentColor'
          : ''
      "
    /> -->
    <div class="lh_button-text">
      <slot>{{
        text && text.length > 6 && !noTurncate
          ? text.slice(0, maxWordCountToTurncate || 6) + '...'
          : text
      }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  props: {
    /*
     * type 影响 color bgcolor border bordercolor 与 iconColor
     * width height radius fontsize fontweight等属性可通过外部class传入（以后要改）
     */
    type: {
      type: String,
      default: 'primary',
      enums: ['primary', /* 置灰 */ 'muted', /* 白色调 */ 'light', 'border', 'text'],
    },

    /**
     * 按钮的大小
     */
    size: {
      type: String,
      default: 'middle',
      enums: ['small', 'middle', 'large'],
    },

    /**
     * 按钮的外形，圆角矩形或胶囊矩形或圆形按钮（慎用）
     */
    shape: {
      type: String,
      default: 'rounded',
      enums: ['rounded', 'capsule', 'circle'],
    },

    /**
     * 与slot有相同效果，但最多只能有6个字（6个字的设定参考微信小程序）
     */
    text: String,
    noBold: Boolean,
    noTurncate: Boolean,
    maxWordCountToTurncate: Number,

    /**
     * icon文件名 例如plus
     */
    icon: String,
    iconColor: String,

    // deprecate 这不应该是button的组件改管的
    isLoading: Boolean,
    disabled: Boolean,
  },
  // setup(props, { emit, slots }) {
  //   const state = reactive({
  //     // isloading: false,
  //   })
  //   const callbacks = {}
  //   return {
  //     state,
  //     callbacks,
  //   }
  // },
})
</script>

<style>
.lh_button {
  display: inline-grid;
  appearance: none;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: 0.25rem;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
}
.lh_button:focus {
  filter: brightness(0.9);
}
.lh_button:hover {
  filter: brightness(0.95);
}
.lh_button:active {
  filter: brightness(0.85);
}
.lh_button--no-icon {
  grid-template-columns: 1fr;
  gap: 0;
}
.lh_button--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.lh_button--no-bold {
  font-size: normal;
}
.lh_button--primary {
  background: var(--color-primary, dodgerblue);
  color: white;
}
.lh_button--muted {
  background-color: var(--color-gray-100);
  color: var(--color-gray-300);
}
.lh_button--light {
  background: white;
  color: var(--color-gray-300);
  border: 1px var(--color-gray-200);
}
.lh_button--border {
  border: 1px currentColor;
}
.lh_button--small {
  border-radius: 0.125rem;
  padding: 0.25rem 0.5rem;
}
.lh_button--middle {
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
}
.lh_button--large {
  border-radius: 0.5rem;
  padding: 1rem 2rem;
}
.lh_button--capsule {
  border-radius: 1000vw;
}
.lh_button-text {
  user-select: none;
}
</style>
