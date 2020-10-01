<template>
  <base-container :active="true">
    <img src="@/assets/image/guide7.jpg" alt="guide">
    <template #item>
      <img class="flag-image" :style="itemStyle[0]" src="@/assets/image/guide7_1.png">
      <img :style="itemStyle[1]" src="@/assets/image/guide7_2.png">
      <img v-show="!flag" class="animate__animated animate__fadeInBottomRight animate__slower" :style="itemStyle[2]" src="@/assets/image/guide7_3.png">
      <div class="fixed-btn" v-if="flag">
        <van-button class="btn" @click="onClick" type="primary">升旗</van-button>
      </div>
    </template>
  </base-container>
</template>

<script>
import BaseContainer from './base-container'
export default {
  components: {
    BaseContainer
  },
  props: {
    size: Object,
    active: Boolean
  },
  data(){
    return {
      items: [
        // [268, 222, 560, 321], // 58
        [268, 222, 560, 1555], // 58
        [1080, 2084, 0, 314],
        [468, 664, 588, 1632]
      ],
      flag: true
    }
  },
  computed: {
    itemStyle(){
      return this.items.map((it, index) => {
        let data = {
          width: it[0] * this.size.r + 'px',
          height: it[1] * this.size.r + 'px',
          left: it[2] * this.size.r - this.size.sw + 'px',
          top: it[3] * this.size.r  - this.size.sh + 'px',
          'z-index': index + 1
        }
        return data
      })
    },
  },
  methods: {
    onClick(){
      if(this.items[0][3] == 321) return
      // this.items[0][3] = 321
      this.$set(this.items[0], 3, 321)
      this.flag = false
    }
  }
}
</script>
<style lang="scss" scoped> 
  .flag-image {
    transition: 5s top ease;
  }
  .fixed-btn {
    position: absolute;
    bottom: 25px;
    left: 0;
    right: 0;
    z-index: 9;
    display: flex;
    justify-content: center;

    .btn {
      width: 120px;
    }
  }
</style>