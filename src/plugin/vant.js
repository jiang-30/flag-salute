import Vue from 'vue';

import { 
  Swipe,
  SwipeItem,
  Picker,
  Form,
  Field,
  Toast,
  Popup,
  Button
} from 'vant'
import '@vant/touch-emulator'
import 'vant/lib/index.css'
Vue.use(Button);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Field);
Vue.use(Form);
Vue.use(Picker);
Vue.use(Swipe)
Vue.use(SwipeItem)