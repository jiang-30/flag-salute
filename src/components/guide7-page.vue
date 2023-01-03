<template>
  <base-container :active="active" :index="index" :current="current" style="background: #fdb5b6;">
    <div class="content-box">
        <div class="header">
        </div>
        <div :style="{'margin-top': '-' + itemStyle[0].height}">
          <div class="middle" :style="{height: itemStyle[0].height}">
            你是第
            <span class="text">{{ saluteNum }}</span>
            位参与者
          </div>
          <div class="body">
            <div class="btn-box">
              <van-button class="btn" type="primary" :loading="saluteLoading" @click="onSalute">敬礼</van-button>
              <van-button class="btn" type="primary" @click="onOpenMessage">留言</van-button>
            </div>
            <div>总策划：王登华 特古斯</div>
            <div>总监制：刘 婧 李国宏 温都苏巴图</div>
            <div>监制：青格勒</div>
            <div>执行策划：冯伟达 吕良慧 郭慧文 刘佳</div>
            <div>联合出品</div>
            <div>内蒙古自治区党委宣传部 内蒙古自治区文明办</div>
            <div>实践杂志社</div>
          </div>
        </div>
      </div>
  </base-container>
</template>

<script>
import BaseContainer from './base-container'
export default {
  props: {
    size: Object,
    current: Number,
    active: Boolean,
    messageNum: Number
  },
  data(){
    return {
      items: [
        [0, 260, 0, 0],
      ],
      index: 6,
      saluteNum: 2,
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
  created(){
    this.fetchNum()
  },
  methods: {
    fetchNum(){
      this.axios.get('/salute/count').then(res => {
        this.saluteNum = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 敬礼
     */
    onSalute() {
      this.saluteLoading = true
      this.axios.post('/salute/count').then(() => {
        // this.$emit('salute-num', this.saluteNum + 1)
        this.saluteNum++
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.saluteLoading = false
      })
    },
    onOpenMessage(){
      this.$emit('message-show')
    }
  }
}
</script>
<style lang="scss" scoped>
  .content-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      flex: 1;
      background-image: url('~@/assets/image/guide7.png');
      background-size: 100% auto;
      background-position: center bottom;
    }
    .middle {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #fff;
      .text {
        padding: 0 15px;
        font-size: 20px;
        color: #000;
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 60px;
      line-height: 20px;
      font-size: 12px;
      color: #333;

      .btn-box {
        height: 50px;
        margin: 30px 0;
        .btn {
          margin: 0 15px;
          padding-left: 30px;
          padding-right: 30px;
          border-radius: 8px;
          opacity: 0.8;
        }
      }
    }
  }
</style>