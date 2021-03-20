<!--  -->
<template>
 
    <scroll class="cart-list ">
            <cart-list-item 
            v-for="(item,index) in $store.state.cartList" 
            :key="index" 
            :item-info='item'/>
    </scroll>
  
</template>

<script>
//加入滚动效果
import Scroll from '../../../components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
    name: 'CartList',
    components: {
        Scroll,
        CartListItem
    },
   
}
</script>

<style  scoped>
   .cart-list {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 93px;
  }
</style>
