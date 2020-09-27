<template>
  <div id="app">
    <div id="swiper" class="swiper-container" :style="{ height: wHeight + 'px' }">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div id="swiper_child" class="swiper-container" style="height: 100%; width: 100%;">
            <div class="swiper-wrapper" >
              <div class="swiper-slide" style="height: auto;">
                <guide-page :height="wHeight" @next="onNext('raising')"></guide-page>
              </div>
            </div>
            <!-- <div class="swiper-scrollbar"></div> -->
          </div>
        </div>
        <div class="swiper-slide">
          <raising-page :height="wHeight" @next="onNext('result')"></raising-page>
        </div>
        <div class="swiper-slide">
          <result-page :height="wHeight"></result-page>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

    <div class="guide-btn" v-if="step == 'guide'">
      <div class="btn animate__animated animate__bounce" @click="onNavGuide">进入升旗仪式</div>
    </div>

    <div class="audio-btn"  @click="onPlay">
      <img class="img animate-revolve" :style="{'animation-play-state':  play ? 'running' : 'paused'}" src="@/assets/icon_music.png" alt="music">
    </div>
  </div>
</template>

<script>
import GuidePage from '@/components/guide-page'
import RaisingPage from '@/components/raising-page'
import ResultPage from '@/components/result-page'

export default {
  components: {
    GuidePage,
    RaisingPage,
    ResultPage,
  },
  data() {
    return {
      step: 'guide',
      // step: 'result',
      wHeight: 500,
      play: true,
      swiper: null
    }
  },
  mounted() {
    let _this = this
    this.swiper = new Swiper('#swiper', {
      direction: 'vertical',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on:{
        slideChange: function(){
          let o = {
            '0': 'guide',
            '1': 'raising',
            '2': 'result'
          }
          _this.step = o[this.activeIndex]
        },
      },
    })
    new Swiper('#swiper_child', {
      //子swiper
      direction: 'vertical',
      nested: true,
      resistanceRatio: 0,
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })
  },
  created() {
    this.wHeight = window.innerHeight
  },
  methods: {
    onNext(key) {
      this.step = key
    },
    onNavGuide(){
      this.swiper.slideTo(1, 1000, false)
    },
    onPlay(){
      this.play = !this.play
    }
  },
}
</script>

<style lang="scss">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  --primary-color: #cc0a0a;
  .van-button--primary {
    color: #fff;
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
  }
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
