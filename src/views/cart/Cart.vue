<template>
  <div class="cart">
    <!-- 头部 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品的列表页 -->
    <cart-list></cart-list>
    <!-- 底部的汇总 -->
    <cart-bottom-bar/>

  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import CartList from './childrenComponent/CartList'
import CartBottomBar from './childrenComponent/CartBottomBar'
 export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      cartLength() {
        return this.$store.getters.cartLength
      }
    }
  }
</script>

<style scoped>
   .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
