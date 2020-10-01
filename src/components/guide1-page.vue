<template>
  <base-container :active="active" :index="index" :current="current">
    <img src="@/assets/image/guide1.jpg" alt="guide1">
    <template #item>
      <img class="animate__animated animate__delay-1s animate__fadeInLeft" :style="itemStyle[0]" src="@/assets/image/guide1_1.png" alt="guide1">
      <img class="animate__animated animate__backInDown" :style="itemStyle[1]" src="@/assets/image/guide1_2.png" alt="guide1">
      <img class="animate__animated animate__delay-1s animate__fadeInRight" :style="itemStyle[2]" src="@/assets/image/guide1_3.png" alt="guide1">
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
        [933, 552, 0, 928],
        [920, 320, 140, 438],
        [837, 505, 243, 1541],
      ],
      index: 0,
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