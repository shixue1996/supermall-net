<!--  -->
<template>
  <div class="toast" v-show="isShow">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    /* message: {
      type: String,
      default: {}
    },
    show: {
      type: Boolean,
      default: false //默认该组件不显示
    } */
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message = '默认文字', duration = 2000) {
      this.isShow = true;
      this.message = message

      setTimeout(() => {
         this.isShow = false;
         this.message = '';
      },duration)
    }
  }
}
</script>

<style  scoped>
 .toast {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%); /* 偏移50%就就居中了  */
   color: white;
   padding: 8px 10px;
   background-color: rgba(0, 0, 0,0.75);
   z-index: 9999;
 }
</style>
