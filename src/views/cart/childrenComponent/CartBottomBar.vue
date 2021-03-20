<!--  -->
<template>
<!-- native是因为组件不能直接添加点击事件 -->
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
      @click.native='checkClick'
      :is-checked="isSelectAll" class="check-button"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click='calcClick'>
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
         return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => 
        item.checked
      ).length
    },
    isSelectAll() {
        /* return !(this.$store.state.cartList.filter(item => item.checked).length) */
        //只有全部被选中 全选按钮才会被选中
        if(this.$store.state.cartList.length === 0) {
          return false
        } else {
           return !this.$store.state.cartList.find(item => !item.checked)
        }
       
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) { //全部被选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else { //如果有不被选中的
         this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      this.$toast.show('请选择购买的商品',2000)
    }
  }
}
</script>

<style  scoped>
.bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px; /* 水平居中 */
    padding-left: 35px;
    box-sizing: border-box;

    display: flex; /* 为了让这个盒子和下边的盒子在一排排列 */

}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.check-content {
  display: flex;
  align-items: center;
  width: 60px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
   width: 90px;
   background-color: red;
   color: #fff;
   text-align: center; 
   /* 要想让最右边的盒子贴着右边 给左右两个盒子一定的宽度 中间盒子flex为1 这样的话就被挤到最右边了*/
}
</style>
