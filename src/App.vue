<template>
  <div id="app">
    <router-view/>
     <!-- 3.使用组件 -->
     <main-tab-bar/>
  </div>
</template>

<script>

//1.导入所需要的模块
import MainTabBar from './components/content/MainTabBar'
export default {
  name: 'App',
  components: {
    //2.注册组件
      MainTabBar
  }
}
</script>

<style>
      
           @import "./assets/css/base.css";  /* 因为在vue.config.js中已经配置了别名 所以这里可以直接使用   */    
</style>
