import Vue from 'vue'
import App from './App.vue'
import './plugin/axios'
import './plugin/vant'
import './plugin/swiper'
import './plugin/animate'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
