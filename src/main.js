/* main.js作为整个项目的入口函数 需要哪一个大的组件 就往这里边import和注册一下 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router 
}).$mount('#app')
