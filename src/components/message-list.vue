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
          <van-button type="primary" round block @click="onShow" >留言</van-button>
        </div>
      </div>
    </van-popup>
      <van-popup v-model="show" position="bottom" closeable round get-container="body">
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
  data(){
    return {
      listShow: false,
      show: false,
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
        this.messageNum = res.page.total
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
      console.log(2223)
      this.fetchList()
    },
    onShow() {
      this.show = true
    },
    onMessage(){
      this.show = false
      this.onRefresh()
    },
  }
}
</script>

<style>

</style>