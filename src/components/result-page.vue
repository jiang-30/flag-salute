<template>
  <div class="result-container">
    <img class="fill-img" src="@/assets/image/result.jpg" alt="result">
    <div class="fixed-btn">
      <div class="btn-item">
        <div class="text">{{ saluteNum }}</div>
        <van-button class="btn" type="primary" size="small" @click="onSalute">点赞</van-button>
      </div>
      <div class="btn-item">
        <div class="text">{{ messageNum }}</div>
        <van-button class="btn" type="primary" size="small" @click="onOpenMessage">留言</van-button>
      </div>
    </div>
    <message-list ref="messageList" :height="height" @message-num="onMessageNum"></message-list>
  </div>
</template>

<script>
import MessageList from '@/components/message-list'

export default {
  props: {
    height: Number,
  },
  components: {
    MessageList,
  },
  data() {
    return {
      saluteNum: 0,
      saluteLoading: false,
      messageNum: 0
    }
  },
  created() {
    this.fetchNum()
  },
  methods: {
    fetchNum(){
      this.axios.get('/flagSalute/num').then(res => {
        this.saluteNum = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 敬礼
     */
    onSalute() {
      this.axios.post('/flagSalute/num').then(() => {
        this.saluteNum++
      }).catch(error => {
        console.log(error)
      })
    },
    onMessageNum(e){
      this.messageNum = e
    },
    onOpenMessage(){
      this.$refs.messageList.show()
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
    bottom: 80px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;

    .btn-item {
      display: flex;
      flex-direction: column;
      align-items: center;
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
