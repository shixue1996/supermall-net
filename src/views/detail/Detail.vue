<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick='titleClick'/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type='3'>
     
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref='params' :param-info="paramInfo"/>
      <detail-comment-info ref='comment' :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods='recommends'/>
    </scroll>
    <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- <toast  :message="message" :show="show"/> --> <!-- 这是普通的封装方式 现在可以使用已经打包好的插件 -->
    <toast></toast>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from '../../components/content/goods/GoodsList'
  import Toast from '../../components/common/toast/Toast'
  
  import {getDetail, Goods, Shop, GoodsParam,getRecommend} from "network/detail";
  import BackTop from 'components/content/backTop/BackTop'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      BackTop,
      Toast,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [] ,//为了拿到几个导航栏标签的offsettop
        currentIndex: 0,
        isShowBackTop: false,
       /*  message: '',
        show: false */
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
       /*  console.log(res); */
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
       
       //7.取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      
     /*  nextTick是根据最新的DOM在页面渲染完成之后执行的函数 但是目前获取的不包括图片信息
     一般情况下值不对的时候 就是图片的问题*/
      /* this.$nextTick(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
        }) */
     })
      //3.请求详情数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
   },
    mounted() {
        /*  this.themeTopYs.push(0)
        this.themeTopYs.push(参数的offsettop)
         this.themeTopYs.push(评论的offsettop)
         this.themeTopYs.push(推荐的offsettop) */

         //这样拿不对 因为在mounted中请求的数据在组件创建完成之后 不一定能刷新出来 得到空数据 尤其是参数组件加了一个v-for 还没有遍历完
        /*  this.themeTopYs.push(this.$refs.params.$el.offsetTop)
         this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
         this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
         console.log(this.themeTopYs); */
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()

        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //console.log(this.themeTopYs)
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      //滚动到某一个内容 导航栏实时对应相应地标题
      contentScroll(position) {
        //1.获取y值
        const positionY = -position.y
        
        //2.positionY与主题的Y值进行比较
        //[0 7938 9120 9452]
        //在0-7938 index = 0
        //在7938-9120 index = 1
        //在9120-9452 index = 2 
        //在超过9452 index =  3
        //分为两种情况 一种是前三种 一种是最后一种
        let length = this.themeTopYs.length
        for(let i  = 0; i < length; i++) {
          if(this.currentIndex !== i && (i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.themeTopYs[i])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        // 3.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      //点击按钮 返回顶部 
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      addToCart() {
        //1.获取购物车需要展示的信息 图片 标题 不确定数据库的名称有没有改变 
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price= this.goods.realPrice
        product.iid= this.iid //商品的唯一标识
        //console.log(product); 说明名字是正确的
        //console.log(this.goods);查看goods的基本信息
        
        //2.将商品添加到购物车
        /* 为了把购物车数据实现多个页面的共享 我们先把信息传到vuex中 然后购物车再从vuex中读取信息 */
        //在这个组件中使用store对象保存的状态即可 通过this.$store.commit('mutation中方法')来修改状态
        //这是在mutation中传递过来的
        //this.$store.commit('addCart',product)
        //这是从 actions中传递过来的
        //因为addCart返回的是一个 promise对象 所以可以直接调用then函数
        this.$store.dispatch('addCart',product).then(res => {
         /*  这是普通的封装方式
           this.show = true;
          this.message = res;
          setTimeout(() => {
              this.show = false;
              this.message = ''
          },2000) */

          this.$toast.show('该商品已成功加入购物车')
        })

        //3.添加到购物车成功
      }
     
       
      
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
