<template>
<div>
<van-popup v-model="listShow" position="bottom" closeable round :style="{height: (height - 158) + 'px'}" get-container="body">
      <div class="message-wrapper"> 
        <div class="message-header">留言列表</div>
        <div class="message-body">
          <div :style="{height: (height - 280) + 'px', overflow: 'auto' }">
            <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
              <van-list v-model="loadLoading" :finished="loadFinished" offset="100" finished-text="没有更多了" @load="onLoad">
                <div class="item" v-for="item in list" :key="item._id">
                  <div class="info">
                    <div style="color: #444;">{{ item.username || '-' }}</div>
                    <div>
                      <span style="margin-right: 10px;">{{ item.address || '-' }}</span>
                      <span style="font-size: 12px;">{{ item.school || '-' }}</span>
                    </div>
                  </div>
                  <div class="content">
                    <span>{{ item.content || '-'}}</span>
                    <!-- <span>{{ item.updated || '-' }}</span> -->
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
        <div class="message-footer">
          <van-button type="primary" round block @click="itemShow = true" >留言</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="itemShow" position="bottom" closeable round get-container="body">
      <c-message @success="onMessage"></c-message>
    </van-popup>
</div>
      
</template>

<script>
import CMessage from '@/components/message'

export default {
  components: {
    CMessage,
  },
  inject: ['height'],
  data(){
    return {
      listShow: false,
      itemShow: false,
      refreshLoading: false,
      loadLoading: false,
      loadFinished: false,
      list: [],
      page: {
        current: 1,
        size: 10
      },
    }
  },
  created(){
    this.fetchList()
  },
  methods: {
    show(){
      this.listShow = true
    },
    fetchList() {
      let params = {
          size: this.page.size,
          current: this.page.current
        }
      this.axios.get('/flagSalute/message/page', {
        params
      }).then(res => {
        if(params.current == 1){
          this.list = res.data
        } else {
          this.list = this.list.concat(res.data)
        }
        this.$emit('message-num', res.page.total)
        if(res.page.total <= (res.page.current -1) * res.page.size + res.data.length){
          this.loadFinished = true
        } else {
          this.page.current++
        }
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.loadingLoading = false
        this.refreshLoading = false
      })
    },
    onRefresh() {
      this.page.current = 1
      this.loadFinished = false
      this.loadLoading = false
      this.fetchList()
    },
    onLoad() {
      this.fetchList()
    },
    onMessage(){
      this.itemShow = false
      this.onRefresh()
    },
  }
}
</script>

<style lang="scss" scoped>
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