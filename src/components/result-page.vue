<template>
  <div class="result-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="place-box" :style="{ height: height + 'px' }">
        guide
        <van-button @click="onSalute">点赞({{ saluteNum }})</van-button>
        <van-button @click="onShow">留言</van-button>
      </div>

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="message-list" v-for="item in list" :key="item" :title="item">
          message-list{{item}}
        </div>
      </van-list>
    </van-pull-refresh>
    <van-popup></van-popup>

    <van-popup v-model="show" position="bottom" closeable round>
      <c-message @success="onMessage"></c-message>
    </van-popup>
  </div>
</template>

<script>
import CMessage from '@/components/message'

export default {
  props: {
    height: Number,
  },
  components: {
    CMessage,
  },
  data() {
    return {
      saluteNum: 0,
      saluteLoading: false,
      show: false,
      count: 0,
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
    }
  },
  created() {
    this.fetchList()
    this.fetchNum()
  },
  methods: {
    fetchList() {
      this.axios.get('/flagSalute/message/page', {
        params: {
          size: 10,
          current: 1
        }
      }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    fetchNum(){
      this.axios.get('/flagSalute/num').then(res => {
        console.log(res)
        this.saluteNum = 30
      }).catch(error => {
        console.log(error)
      })
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
        this.count++
        this.fetchList()
      }, 1000)
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onShow() {
      this.show = true
    },
    onMessage(){
      this.show = false
      this.onRefresh()
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
  },
}
</script>

<style lang="scss">
.result-container {
  .place-box {
    background-color: #00f;
  }
}
</style>
