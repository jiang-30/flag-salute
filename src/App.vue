<template>
  <div id="app" ref="app" class="h100">
    <van-swipe 
      ref="swiper"
      class="my-swipe h100"
      indicator-color="red"
      :loop="false"
      vertical
      :stop-propagation="false"
      @touchstart.native="onMove"
      @change="onChange">
      <van-swipe-item><guide1-page :size="styleSize" v-if="init.guide1" :current="swiperIndex" :active="swiperIndex == 0" /></van-swipe-item>
      <van-swipe-item><guide2-page :size="styleSize" v-if="init.guide2" :current="swiperIndex" :active="swiperIndex == 1" /></van-swipe-item>
      <van-swipe-item><guide3-page :size="styleSize" v-if="init.guide3" :current="swiperIndex" :active="swiperIndex == 2" /></van-swipe-item>
      <van-swipe-item><guide4-page :size="styleSize" v-if="init.guide4" :current="swiperIndex" :active="swiperIndex == 3" /></van-swipe-item>
      <van-swipe-item><guide5-page :size="styleSize" v-if="init.guide5" :current="swiperIndex" :active="swiperIndex == 4" /></van-swipe-item>
      <van-swipe-item><guide6-page :size="styleSize" v-if="init.guide6" :current="swiperIndex" :active="swiperIndex == 5" /></van-swipe-item>
      <van-swipe-item>
        <guide7-page 
          v-if="init.guide7"
          :salute-num="saluteNum"
          :message-num="messageNum" 
          :size="styleSize"
          :current="swiperIndex"
          :active="swiperIndex == 6" 
          @salute-num="onSaluteNum" 
          @message-show="onMessage"/>
      </van-swipe-item>
      <!-- <van-swipe-item>
        <raising-page :size="styleSize"  @next="onNext('result')"></raising-page>
      </van-swipe-item>
      <van-swipe-item>
        <result-page 
          :size="styleSize" 
          :active="swiperIndex == 7" 
          :salute-num="saluteNum"
          :message-num="messageNum"
          @salute-num="onSaluteNum" 
          @message-show="onMessage">
        </result-page>
      </van-swipe-item> -->
    </van-swipe>

    <!-- <div class="guide-btn" v-if="step == 'guide'">
      <div class="btn animate__animated animate__bounce" @click="onNext('raising')">进入升旗仪式</div>
    </div> -->

    <div class="fixed-btns">
      <div class="item-btn"  @click="onPlay">
        <img class="img animate-revolve" :style="{'animation-play-state':  play ? 'running' : 'paused'}" src="@/assets/image/icon_music.png" alt="music">
      </div>
      <!-- <div class="item-btn"  @click="onMessage">
        <img class="img" src="@/assets/image/icon_message.png" alt="message">
      </div> -->
    </div>
    
    <audio ref="bgMusic" style="width: 0; height: 0;" autoplay loop preload="auto">
      <source src="@/assets/audio/bg.ogg" type="audio/ogg">
      <source src="@/assets/audio/bg.mp3" type="audio/mpeg">
      您的浏览器不支持 audio 元素。
    </audio>
    <message-list ref="messageList" v-if="init.guide7" @message-num="onMessageNum"></message-list>
  </div>
</template>

<script>
// import RaisingPage from '@/components/raising-page'
// import ResultPage from '@/components/result-page'
import MessageList from '@/components/message-list'
import Guide1Page from '@/components/guide1-page'
import Guide2Page from '@/components/guide2-page'
import Guide3Page from '@/components/guide3-page'
import Guide4Page from '@/components/guide4-page'
import Guide5Page from '@/components/guide5-page'
import Guide6Page from '@/components/guide6-page'
import Guide7Page from '@/components/guide7-page'

export default {
  components: {
    // RaisingPage,
    // ResultPage,
    MessageList,
    Guide1Page,
    Guide2Page,
    Guide3Page,
    Guide4Page,
    Guide5Page,
    Guide6Page,
    Guide7Page,
  },
  data() {
    return {
      step: 'guide',
      swiperIndex: 0,
      play: false,
      flag: true,
      saluteNum: 1,
      messageNum: 2,
      styleSize: {
        r: 1,
        sw: 0,
        sh: 0
      },
      init: {
        guide1: true,
        flag1: true,
        guide2: true,
        flag2: true,
        guide3: false,
        flag3: true,
        guide4: false,
        flag4: true,
        guide5: false,
        flag5: true,
        guide6: false,
        flag6: true,
        guide7: false,
        flag7: true,
      }
    }
  },
  watch: {
    swiperIndex: {
      handler(val){
        let guideKey = 'guide' + (val + 2)
        let flagKey = 'flag' + (val + 2)
        if(this.init[flagKey]){
          this.init[guideKey] = true
          this.init[flagKey] = false
        }
      },
    }
  },
  provide(){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  mounted(){
    this.handlerInit()
  },
  methods: {
    handlerInit(){
      let w = window.innerWidth
      let h = window.innerHeight
      let imgW = 1080
      let imgH = 2400
      let r = h/imgH
      let sh = 0
      let sw = 0
      if(w/h <= imgW/imgH){
        r = h/imgH
        sw = (imgW * r - w) / 2
      } else {
        r = w / imgW
        sh = (imgH * r - h) / 2
      }
      this.styleSize = {
        r,
        sw,
        sh
      }
    },
    /** swiper change */
    onChange(e){
      this.swiperIndex = e
      if(e == 7) {
        this.step = 'result'
      } else if(e == 6) {
        this.step = 'raising'
      } else {
        this.step = 'guide'
      }
    },
    onNext(key) {
      this.step = key
      let index = 0
      if(key == 'raising'){
        index = 6
      } else if(key == 'result'){
        index = 7
      }
      this.$refs.swiper.swipeTo(index, {immediate: true})
    },
    onMove(){
      if(this.flag){
        this.$refs.bgMusic.play().then(() => {
          this.flag = false
          this.play = true
        }).catch(() => {
        })
      }
    },
    onPlay(){
      let audio = this.$refs.bgMusic
      this.play = !this.play
      if(this.play){
        this.flag = true
        audio.play()
      } else {
        audio.pause();
      }
    },
    onMessage(){
      this.$refs.messageList.show()
    },
    onSaluteNum(e){
      this.saluteNum = e
    },
    onMessageNum(e){
      this.messageNum = e
    }
  },
}
</script>
<style lang="scss" scoped>
.animate-revolve {
  animation:turn 3s linear infinite;   
}
@keyframes turn{
  0%{transform:rotate(0deg);}
  25%{transform:rotate(90deg);}
  50%{transform:rotate(180deg);}
  75%{transform:rotate(270deg);}
  100%{transform:rotate(360deg);}
}
.guide-btn {
    position: fixed;
    bottom: 60px;
    left: 0;
    right: 0;
    z-index: 99;
    display: flex;
    justify-content: center;

    .btn {
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      background-color: rgba(255, 0, 0, 0.5);
    }
  }
  .fixed-btns {
    position: fixed;
    right: 10px;
    // bottom: 200px;
    top: 30px;
    z-index: 9;
    display: flex;
    flex-direction: column;
  }
  .item-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    margin-top: 15px;
    border: 1px solid #fff;
    border-radius: 20px;
    background-color: rgba(255, 0, 0, 0.6);
    .img {
      width: 24px;
      height: 24px;
    }
  }
</style>
<style lang="scss">
html,
body,
.h100 {
  height: 100%;
}
body {
  --primary-color: #cc0a0a;
  --bg-color: #ffe0b1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: var(--bg-color);
  .van-button--primary {
    color: #fff;
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
  }

}
.fill-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>