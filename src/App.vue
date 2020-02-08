<template>
  <div id="app" class="app">
    <img src="@/assets/images/bg.jpg" alt="" class="imgbg">
    <div class="appSection">
      <!-- head -->
      <div class="titleAll">
        <!-- 点击老师介绍 -->
        <title-btn @click="tTecherShow" :icon="icon1" :iconText="icon1Text"></title-btn>
        <!-- 课程表 -->
        <title-btn @click="tClassShow" :icon="icon1" :iconText="icon2Text"></title-btn>
      </div>
      <div class="mainCon">
        <div class="mianLive">

        </div>
        <div class="mianChat">
          <!-- 轮播图 start-->
          <div class="swiperBox" v-if="bannersInfo.length > 0" v-show="hideSW">
            <swiper-cp :bannersInfo="bannersInfo" :isRunning="isRunning">
              <template v-slot:default="klkl">
                <img v-if="klkl.banner.imageUrl" :src="klkl.banner.imageUrl" alt="" class="bannerimg">
                <div v-if="klkl.isQQ" @click="qqlink" class="imgPopFnIcon">isQQ</div>
                <div v-if="klkl.banner.imageUrl" @click="ispop(klkl.banner.imageUrl)" class="imgPopFnIcon">showUrl</div>
                <div v-if="klkl.Link" @click="islink(klkl.Link)" class="imgPopFnIcon">islink</div>

              </template>
            </swiper-cp>
            <span class="swiperCpClose" @click="hideSwiper"></span>
          </div>
          <!-- 聊天 -->
          <emotion class="chatContain"></emotion>
        </div>
        <img src="@/assets/images/logo.png" alt="" class="caiqiuBtn" v-drag>
      </div>

    </div>
    <!-- 弹窗  -->
    <div class="maskpop" v-show="isShow">
      <div class="mask"></div>
      <div class="showPop">
        <keep-alive>
          <!-- 组建切换 -->
          <components :is="popContent" :keys="popContent"></components>
        </keep-alive>
        <span class="closeImg" @click="closePop"></span>
      </div>
    </div>

    <!-- 轮播图弹出 -->
    <div v-if="showMaskpop">
      <div class="mask"></div>
      <div class="showPop">
        <img :src="popImgUrl" alt="">
        <span class="closeImg" @click="showMaskpop = !showMaskpop"></span>
      </div>
    </div>

    <!-- <span @click="sendRequest1" v-klkl>开启http请求---------轮播图请求</span>
    <br>
    <span @click="sendRequest2">开启http请求9999999</span>
    <br>
    <span @click="cancel">阻止http请求</span> -->

    <!-- 弹出 -->

  </div>
</template>

<script>
  import base from "@/request/base";
  import axios from 'axios'
  //轮播图 组件
  import swiperCp from './components/swiperCp.vue'
  import titleBtn from './components/titleBtn'
  import emotion from './components/emotion'

  // 课程表
  import kechengbiao from './components/kechengbiao'
  // 老师介绍
  import teachers from './components/teachers'

  // 指令函数 -- 冒泡泡
  import cursorEffects from "@/assets/js/cursor-effects.js"
  // 指令函数 -- 拖拽
  import drag from "@/assets/js/drag.js"

  export default {
    name: 'app',
    components: {
      swiperCp,
      titleBtn,
      emotion,
      kechengbiao,
      teachers
    },
    data: function () {
      return {
        bannersInfo: {},
        icon1: require('@/assets/images/logo.png'),
        icon1Text: '老师介绍',
        icon2Text: '课程表',

        isRunning: false,



        source: null, //定义需要阻止的axios
        hideSW: false,
        showMaskpop: false, //弹出状态
        popImgUrl: '',

        popContent: '', //弹窗想要加载的组件
        isShow: false, //控制 弹窗 显示与隐藏
      }
    },
    created: function () {

    },
    mounted: function () {
      let that = this;

      //调用banner
      that.sendRequest1()

    },
    methods: {
      closePop() {
        // 弹窗开关
        let self = this;
        self.isShow = !self.isShow
      },
      tTecherShow() {
        // 切换组件 =>老师介绍
        let self = this;
        self.isShow = !self.isShow
        self.popContent = 'teachers'
      },
      tClassShow() {
        // 切换组件 =>课程表
        let self = this;
        self.isShow = !self.isShow
        self.popContent = 'kechengbiao'

      },
      sendRequest1() {
        //获取轮播图数据
        var self = this;
        // axios中取消请求（使用CancelToken）
        // https://www.cnblogs.com/wen233/p/10997678.html
        // https://www.jianshu.com/p/1662e2524c64
        self.source2 = axios.CancelToken.source(); // 这里初始化source对象
        // eslint-disable-next-line no-console
        console.log(self.source2)
        // eslint-disable-next-line no-console
        axios.get(`${base.bd}banner`, {
            cancelToken: self.source2.token
          })
          .then(response => {
            // eslint-disable-next-line no-console
            console.log(response.data.banners)
            // eslint-disable-next-line no-console
            self.bannersInfo = response.data.banners
            self.hideSW = true
          })
          .catch(res => {
            // 如果调用了cancel方法，那么这里的res就是cancel传入的信息
            // 你的逻辑
            // eslint-disable-next-line no-console
            console.log(res)
          })


        // cancel the request (the message parameter is optional)
        // self.source2.cancel('中断')
      },
      sendRequest2() {
        var self = this;
        self.source = axios.CancelToken.source(); // 这里初始化source对象
        axios.get('https://tonghang.oneil88.com/sinfo/api.rise_sharply/getinfo_for_reception', {
            cancelToken: self.source.token
          })
          .then(response => {
            // 你的逻辑
            // eslint-disable-next-line no-console
            console.log(response.data.data)
          })
          .catch(res => {
            // 如果调用了cancel方法，那么这里的res就是cancel传入的信息
            // 你的逻辑
            // eslint-disable-next-line no-console
            console.log(res)
          })
      },
      cancel() {
        var self = this
        self.source2.cancel('中断')
      },
      hideSwiper() {

        var self = this;
        self.hideSW = false;
      },
      ispop(url) {
        var self = this;
        self.showMaskpop = !self.showMaskpop
        self.popImgUrl = url
      }

    },
    directives: {
      klkl: {
        bind(el, binding) {
          // eslint-disable-next-line no-console
          console.log('©' + el)
          // eslint-disable-next-line no-console
          console.log(binding)
          // eslint-disable-next-line no-console
          new cursorEffects(el).init()
        }
      },
      drag: {
        bind(el, binding) {
          new drag({
            obj: el,
            eventClickFn: function () {
              // eslint-disable-next-line no-console
              console.log('dianji')
            }
          })
        }
      }

    }
  }
</script>

<style>

</style>