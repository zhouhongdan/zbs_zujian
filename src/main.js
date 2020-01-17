import Vue from 'vue'
import App from './App.vue'


import {post,get,patch,put} from "@/request/http"

import "@/assets/css/reset.css"
import  router from "@/router/index.js"
import api from "@/request/index.js"

import $ from 'jquery'


Vue.config.productionTip = false
Vue.prototype.$post=post;
Vue.prototype.$get =get;
Vue.prototype.$patch = patch;
Vue.prototype.$put =put


Vue.prototype.$api =api
Vue.prototype.$JQ = $

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
