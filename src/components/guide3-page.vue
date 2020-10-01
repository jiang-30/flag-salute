<template>
  <base-container :active="active" :index="index" :current="current">
    <img src="@/assets/image/guide3.jpg" alt="guide">
    <template #item>
    <img class="animate__animated animate__fadeInDown" :style="itemStyle[0]" src="@/assets/image/guide3_1.png" alt="guide1">
      <img class="animate__animated animate__fadeInBottomLeft animate__delay-1s" :style="itemStyle[1]" src="@/assets/image/guide3_2.png" alt="guide1">
      <img class="animate__animated animate__fadeInBottomRight animate__delay-1s" :style="itemStyle[2]" src="@/assets/image/guide3_3.png" alt="guide1">
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
        [369, 79, 572, 282],
        [1080, 687 * 2, 0 * 2, 513 * 2],
        [494, 204 , 530, 1420],
      ],
      index: 2,
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