<template>
  <div id="app" ref="app" class="h100">
    <van-swipe 
      ref="swiper"
      class="my-swipe h100"
      indicator-color="red"
      :loop="false"
      vertical
      @change="onChange">
      <van-swipe-item>
        <img class="fill-img" src="@/assets/image/guide1.jpg" alt="guide">
      </van-swipe-item>
      <van-swipe-item>
        <img class="fill-img" src="@/assets/image/guide2.jpg" alt="guide">
      </van-swipe-item>
      <van-swipe-item>
        <img class="fill-img" src="@/assets/image/guide3.jpg" alt="guide">
      </van-swipe-item>
      <van-swipe-item>
        <img class="fill-img" src="@/assets/image/guide4.jpg" alt="guide">
      </van-swipe-item>
      <van-swipe-item>
        <img class="fill-img" src="@/assets/image/guide5.jpg" alt="guide">
      </van-swipe-item>
      <van-swipe-item>
        <img class="fill-img" src="@/assets/image/guide6.jpg" alt="guide">
      </van-swipe-item>
      <van-swipe-item>
        <raising-page @next="onNext('result')"></raising-page>
      </van-swipe-item>
      <van-swipe-item>
        <result-page></result-page>
      </van-swipe-item>
    </van-swipe>

    <div class="guide-btn" v-if="step == 'guide'">
      <div class="btn animate__animated animate__bounce" @click="onNext('raising')">进入升旗仪式</div>
    </div>

    <div class="audio-btn"  @click="onPlay">
      <img class="img animate-revolve" :style="{'animation-play-state':  play ? 'running' : 'paused'}" src="@/assets/image/icon_music.png" alt="music">
    </div>
    <audio ref="bgMusic" style="visibility: hidden; width: 0; height: 0;" loop preload="metadata" autoplay>
      <source src="@/assets/audio/bg.ogg" type="audio/ogg">
      <source src="@/assets/audio/bg.mp3" type="audio/mpeg">
      您的浏览器不支持 audio 元素。
    </audio>
  </div>
</template>

<script>
import RaisingPage from '@/components/raising-page'
import ResultPage from '@/components/result-page'

export default {
  components: {
    RaisingPage,
    ResultPage,
  },
  data() {
    return {
      step: 'guide',
      play: true,
      flag: true
    }
  },
  provide(){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  methods: {
    onChange(e){
      if(this.flag){
        this.$refs.bgMusic.play()
        this.flag = false
      }
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
    onPlay(){
      let audio = this.$refs.bgMusic
      this.play = !this.play
      if(this.play){
        audio.play();
      } else {
        audio.pause();
      }
    }
  },
}
</script>

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
    bottom: 100px;
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
  .audio-btn {
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 20px;
    background: #cc0a0a;

    .img {
      width: 24px;
      height: 24px;
    }
  }
</style>
