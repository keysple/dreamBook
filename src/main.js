// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'  //themne light
import App from './App'
import router from './router'
import axios from  'axios'
import echarts from 'echarts'
import  Vuex from 'vuex'
import store from './vuex/store'

/*Vue.use(Vuex)*/
Vue.use(echarts)
Vue.use(MuseUI)
Vue.prototype.$ajax =axios
Vue.config.productionTip = false
/*路由挂载到组件上，app组件*/
new Vue({
el: '#app',
  router,
   store,
  template: '<App/>',
  components: { App }
})
