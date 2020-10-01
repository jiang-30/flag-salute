<template>
  <base-container :active="active" :index="index" :current="current">
    <img class="fill-img" src="@/assets/image/guide4.jpg" alt="guide">
    <template #item>
      <img class="guide-item animate__animated animate__rotateInDownRight" :style="itemStyle[0]" src="@/assets/image/guide4_1.png" alt="guide1">
      <img class="guide-item animate__animated animate__rotateInDownLeft" :style="itemStyle[1]" src="@/assets/image/guide4_2.png" alt="guide1">
    </template>
  </base-container>
</template>

<script>
import BaseContainer from './base-container'
export default {
  props: {
    size: Object,
    current: Number,
    active: Boolean
  },
  data(){
    return {
      items: [
        [449, 260, 575, 456],
        [403, 260, 48, 1432],
      ],
      index: 3,
    }
  },
  components: {
    BaseContainer
  },
  computed: {
    itemStyle(){
      return this.items.map((it, index) => {
        return {
          width: it[0] * this.size.r + 'px',
          height: it[1] * this.size.r + 'px',
          left: it[2] * this.size.r - this.size.sw + 'px',
          top: it[3] * this.size.r  - this.size.sh + 'px',
          'z-index': index + 1
        }
      })
    },
  }
}
</script>
