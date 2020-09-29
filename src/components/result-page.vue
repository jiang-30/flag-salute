<template>
  <div class="result-container">
    <img class="fill-img" src="@/assets/image/result.jpg" alt="result">
    <div class="fixed-btn">
      <div class="btn-item">
        <div class="text">{{ saluteNum }}</div>
        <van-button class="btn" type="primary" size="small" :loading="saluteLoading" @click="onSalute">敬礼</van-button>
      </div>
      <div class="btn-item">
        <div class="text">{{ messageNum }}</div>
        <van-button class="btn" type="primary" size="small" @click="onOpenMessage">留言</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    saluteNum: Number,
    messageNum: Number
  },
  data() {
    return {
      saluteLoading: false,
    }
  },
  methods: {
    /**
     * 敬礼
     */
    onSalute() {
      this.saluteLoading = true
      this.axios.post('/flagSalute/num').then(() => {
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
.result-container {
  position: relative;
  height: 100%;

  .result-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fixed-btn {
    position: absolute;
    bottom: 100px;
    left: 0;
    right: 0;
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
}
</style>
