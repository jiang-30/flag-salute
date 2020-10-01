<template>
  <base-container :active="active" :index="index" :current="current">
    <img class="fill-img" src="@/assets/image/guide6.jpg" alt="guide">
    <template #item>
      <img class="guide-item animate__animated animate__zoomIn animate__delay-1s" :style="itemStyle[0]" src="@/assets/image/guide6_1.png" alt="guide1">
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
        [823, 261, 132, 1424],
      ],
      index: 5,
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