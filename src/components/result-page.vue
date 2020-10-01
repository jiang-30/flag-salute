<template>
  <base-container :active="active">
    <img src="@/assets/image/guide8.jpg" alt="guide">
    <template #item>
      <img class="guide-item animate__animated animate__fadeInDown" :style="itemStyle[0]" src="@/assets/image/guide8_1.png">
      <img class="guide-item animate__animated animate__fadeInBottomRight" :style="itemStyle[1]" src="@/assets/image/guide8_2.png">
      <div class="fixed-btn">
        <div class="btn-item">
          <div class="text">{{ saluteNum }}</div>
          <van-button class="btn" type="primary" :loading="saluteLoading" @click="onSalute">敬礼</van-button>
        </div>
        <div class="btn-item">
          <div class="text">{{ messageNum }}</div>
          <van-button class="btn" type="primary" @click="onOpenMessage">留言</van-button>
        </div>
      </div>
    </template>
  </base-container>
</template>

<script>
import BaseContainer from './base-container'
export default {
  props: {
    size: Object,
    active: Boolean,
    saluteNum: Number,
    messageNum: Number
  },
  data(){
    return {
      items: [
        [1080, 938, 0, 0],
        [560, 795, 511, 1348]
      ],
      saluteLoading: false,
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
  },
  methods: {
    /**
     * 敬礼
     */
    onSalute() {
      this.saluteLoading = true
      this.axios.post('/num').then(() => {
        this.$emit('salute-num', this.saluteNum + 1)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.saluteLoading = false
      })
    },
    onOpenMessage(){
      this.$emit('message-show')
    }
  },
}
</script>
<style lang="scss" scoped>
  .fixed-btn {
    position: absolute;
    bottom: 100px;
    left: 0;
    right: 0;
    z-index: 99;
    display: flex;
    justify-content: space-around;

    .btn-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // width: 120px;
      // height: 120px;
      // border-radius: 60px;
      // background-color: rgba(0, 0, 0, 0.2);
      // box-shadow: 0 0 30px 0 #eee;
    }
    .text {
      font-size: 18px;
      line-height: 30px;
      font-weight: 500;
      color: #fff;
    }
    .btn {
      width: 90px;
    }
  }
</style>