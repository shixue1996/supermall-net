import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
//注意这里导入模块的时候 没有必要用/
//1.安装
Vue.use(Vuex)

//2.创建实例化对象

const state = {
   cartList: []
}
const store = new Vuex.Store({
   state,
   mutations: {
      //目的修改state的状态
      //mutation完成的事情就是要比较单一
      //逻辑关系放在action中 追踪计算放在mutation中
      addCounter(state,payload) {
         payload.count ++
      },
      addToCart(state,payload) {
         //在点击添加到购物车的时候 给购物车页面一个默认的属性 checked
         payload.checked = true
         state.cartList.push(payload)
      }
   },
   actions: {
      //需要逻辑的东西 放在actions中
      //第一个参数是要修改的状态，第二个是要传递的参数
     addCart(context,payload) {
      return new Promise((resolve,reject) => {
         //1.查找之前数组中是否有该商品
         let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
  
         //2.判断oldProduct
         if(oldProduct) {
            context.commit('addCounter', oldProduct)
            resolve('当前商品数量加一')
         } else {
            payload.count = 1
            context.commit('addToCart',payload)
            resolve('添加了新的商品')
         }
      })
     }
   },
   getters
})

//3.导出store并且挂载到vue实例上
export default store