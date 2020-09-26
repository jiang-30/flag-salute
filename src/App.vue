<template>
  <div id="app">
    <guide-page v-if="step == 'guide'" :height="wHeight" @next="onNext('raising')"></guide-page>
    <raising-page v-if="step == 'raising'" :height="wHeight" @next="onNext('result')"></raising-page>
    <result-page v-if="step == 'result'" :height="wHeight"></result-page>
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
  data(){
    return {
      step: 'guide',
      wHeight: 500
    }
  },
  created(){
    this.wHeight = window.innerHeight
    console.log('wHeight', window.innerHeight)
  },
  methods: {
    onNext(key){
      this.step = key
    }
  },

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  --primary-color: #cc0a0a;
  .van-button--primary {
      color: #fff;
      background-color:  var(--primary-color);
      border: 1px solid  var(--primary-color);
  }
}
</style>
