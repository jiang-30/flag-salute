<template>
  <div class="result-container">
    <img class="result-image" src="@/assets/result.jpg" alt="result">
    <div class="fixed-btn">
      <div class="btn-item">
        <div class="text">{{ saluteNum }}</div>
        <van-button class="btn" type="primary" size="small" @click="onSalute">点赞</van-button>
      </div>
      <div class="btn-item">
        <div class="text">{{ messageNum }}</div>
        <van-button class="btn" type="primary" size="small" @click="listShow = true">留言</van-button>
      </div>
    </div>
    <message-list ref="messageList" @message-num="onMessageNum"></message-list>
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
      this.axios.post('/flagSalute/num').then(res => {
        console.log(res)
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
    bottom: 10px;
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
  .place-box {
    background-color: #00f;
  }
}
.message-wrapper {
    position: relative;
    overflow: hidden;
    // display: flex;
    // flex-direction: column;
  }
  .message-header {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 52px;
    line-height: 52px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #fff;
    background-color: var(--primary-color);
  }
  .message-body {
    position: relative;
    // left: 0;
    // right: 0;
    // top: 52px;
    // bottom: 50px;
    padding-top: 52px;
    padding-bottom: 70px;
  }
  .message-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;

    height: 70px;
    padding: 0 50px;
    background-color: #fff;
  }

  .item {
    padding: 8px 15px;

    .info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      border-bottom: 1px dashed #eee;
      font-size: 16px;
      color: #888;
      line-height: 30px;
    }
    .content {
      line-height: 20px;
      font-size: 14px;
      color: #444;
    }
  }
</style>
