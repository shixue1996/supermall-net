import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
//导入自己封装的 toast插件、
import toast from './components/common/toast/index'
Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

//fastclick插件可以减少移动端300ms的延迟
FastClick.attach(document.body)

//图片的懒加载 用到时在加载 不提前加载
Vue.use(VueLazyLoad)



new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')


