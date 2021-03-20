<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    //是为了在详情页的请求数据中也能使用这个模块 但是因为两个的数据结构不一样 所以只能这样写了
    /* 之后在上边的src中绑定一下这个属性 */
    computed: {
        showImage() {
          return this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods: {
      imageLoad() {
        //下边是为了 在详情页加载完图片后不告诉首页 告诉详情页 在首页加载加载完之后告诉首页
        /* if(this.$route.path.indexOf('/home')) {
           this.$bus.$emit('homeitemImageLoad')
        } else if(this.$route.path.indexOf('/detail') ) {
          this.$bus.$emit('detailitemImageLoad')
        } */
        this.$bus.$emit('itemImageLoad')
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
