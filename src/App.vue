<template>
  <div id="app">
    <!-- 轮播图 -->
    <div class="swiperBox" v-if="bannersInfo.length > 0" v-show="hideSW">
      <swiper-cp :bannersInfo="bannersInfo" :isRunning="isRunning1" >
       <template v-slot:default="klkl">
          <img-pop :bannerurl="klkl.banner.imageUrl" :isShowImg="klkl.banner.imageUrl" ></img-pop>
      </template>
      </swiper-cp>
      <span class="swiperCpClose" @click="hideSwiper"></span>
    </div>
    
    <!-- 点击老师介绍 -->
    <div class="titleAll">
        <title-btn @click="tTecherShow" :icon="icon1" :iconText="icon1Text"></title-btn>
    </div>
    <swiper-cp :bannersInfo="bannersInfo" v-show="showteacher" :isRunning="isRunning2" >
       <template v-slot:default="klkl">
          <img-pop :bannerurl="klkl.banner.imageUrl" :isShowImg="klkl.banner.imageUrl"></img-pop>
       </template>
    </swiper-cp>
    <!-- 课程表 -->
    <div class="titleAll">
        <title-btn @click="tClassShow" :icon="icon1" :iconText="icon1Text"></title-btn>
    </div>
    <div v-show="showClass" >
       <p v-for="(item,index) in classInfo" :key="index" :class="[currentTime == index?'currentTime':'']">{{item.teacher}}</p>
    </div>
    <span @click="sendRequest1" v-klkl >开启http请求---------</span>
    <br>
    <span @click="sendRequest2" >开启http请求9999999</span>
    <br>
    <span @click="cancel">阻止http请求</span>
    <div  class="caiqiuBtn" ref="opop" v-drag>自定义指令</div>
    <emotion></emotion>
  </div>
</template>

<script>
import base from "@/request/base";
//轮播图 组件
import imgPop from './components/imgPop'
import swiperCp from './components/swiperCp.vue'
import titleBtn from './components/titleBtn'
import emotion from './components/emotion'
// import logo from '@/assets/logo.png'

import axios from 'axios'


import cursorEffects from "@/assets/js/cursor-effects.js"
import drag from "@/assets/js/drag.js"

export default {
  name: 'app',
  components: {
    swiperCp,
    titleBtn,
    imgPop,
    emotion
  },
  data:function(){
    return{
      bannersInfo:{},
      icon1:require('@/assets/images/logo.png'),
      icon1Text:'老师介绍',
      showteacher:false,
      showClass:false,
      isRunning1:true,
      isRunning2:true,
      isRunning3:false,
      classInfo:[
        {
          teacher:'老师1',
          time:'16:00-16:30'
        },
        {
          teacher:'休息',
          time:'16:30-16:45'
        },
        {
          teacher:'老师2',
          time:'16:45-16:59'
        }
      ],
      isNotAsyn1:false,
      isNotAsyn2:true,
      currentTime:100,
      source: null,//定义需要阻止的axios
      hideSW:false
 
    }
  },
  created:function(){
    
  },
  mounted:function(){
    let that =this;
  

  },
  methods:{
    tTecherShow(){
      let self = this;
      self.showteacher = !self.showteacher;
    },
    tClassShow(){
      let self = this;
      self.getTimeallFn();
      self.showClass = !self.showClass;
      
    },
    getTimeallFn(){
      var self = this;
      var arraytime = [];
      var time = new Date();
      var year = time.getFullYear();
      var month = time.getMonth()+1;
      var day = time.getDate();
      var todayTime = `${year}/${month}/${day}`;
      self.classInfo.forEach(function(item,index){
        let time = item.time.toString().split('-')
        arraytime.push({index :index,dayTimeS:`${todayTime} ${time[0]}:00`,dayTimeE:`${todayTime} ${time[1]}:00`})
      })
      // eslint-disable-next-line no-console
      console.log(arraytime)
      let nowString = time.getTime().toString().substring(0,10);
      // eslint-disable-next-line no-console
      console.log('new'+nowString)
      arraytime.forEach(function(item){
          let TimeSToStr = new Date(item.dayTimeS).getTime().toString().substring(0,10);
          let TimeEToStr = new Date(item.dayTimeE).getTime().toString().substring(0,10);
          // eslint-disable-next-line no-console
          console.log('tiS'+TimeSToStr)
          // eslint-disable-next-line no-console
          console.log('tiE'+TimeEToStr)
          if(nowString >= TimeSToStr && nowString <= TimeEToStr){
            self.currentTime = parseInt(item.index)
            // eslint-disable-next-line no-console
            console.log('current==='+self.currentTime)
          }
      })
      
    },
    sendRequest1(){
        //获取轮播图数据
        var self = this;
        // axios中取消请求（使用CancelToken）
        // https://www.cnblogs.com/wen233/p/10997678.html
        // https://www.jianshu.com/p/1662e2524c64
        self.source2 = axios.CancelToken.source(); // 这里初始化source对象
        // eslint-disable-next-line no-console
        console.log(self.source2)
        // eslint-disable-next-line no-console
        axios.get(`${base.bd}banner`,{
          cancelToken: self.source2.token
        })
        .then(response=>{
          // eslint-disable-next-line no-console
          console.log(response.data.banners)
          // eslint-disable-next-line no-console
          self.bannersInfo = response.data.banners
          self.hideSW =true
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
      axios.get('https://tonghang.oneil88.com/sinfo/api.rise_sharply/getinfo_for_reception',{
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
      var self =this
      self.source2.cancel('中断')
    },
    hideSwiper(){
      var self = this;
      self.hideSW = false;
    }

  },
  directives:{
    klkl:{
      bind(el,binding){
         // eslint-disable-next-line no-console
        console.log('©'+el)
        // eslint-disable-next-line no-console
        console.log(binding)
        // eslint-disable-next-line no-console
        new cursorEffects(el).init()
      }
    },
    drag:{
      bind(el,binding){
         new drag({
              obj :el,
              eventClickFn:function(){
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
.titleAll{display: flex;justify-content: left;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}
.currentTime{color:red;}
.caiqiuBtn{left:50px;top:50px;height:100px;width:300px;border:1px solid red;cursor:pointer;border-radius:5px;line-height: 40px;text-align: center;}

.swiperBox{position: relative;width:410px;margin:auto;}
.swiperCpClose{position: absolute;right:0;top:0;width:50px;height: 50px;background:#ccc;cursor: pointer;}
</style>
