<!--  -->
<template>
  <div class="check-button" :class="{check: isChecked}">
     <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  //进行选中与否的按钮的设计、
  props: {
      isChecked: {
          type: Boolean,
          default: false
      }
  }
  //点击选中不选中按钮是从模型里边改的 就是获取商品信息的那个模型cartlistitem
}
</script>

<style  scoped>
  .check-button {
      
      border-radius: 50%;
      border: 2px solid #aaa;
  }
  /* 动态的决定 是否处于选中状态 */
  .check {
      border-color: red;
      background-color: red;
  }
</style>
