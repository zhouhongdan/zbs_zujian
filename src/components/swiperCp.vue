/* eslint-disable no-console */

<template>
  <div class="swiperCp" v-if="bannersInfo" >
      <ul class="swiperCpUl" >
        <li v-for="(banner,index) in bannersInfo" :key="banner.index" v-show="indexNum === index"  @mouseover="stopRunning(index)" @mouseout="goRunning()"
        > 
          <!-- {{banner}} -->
          <slot :banner="banner" :bannersInfo="bannersInfo"></slot>
        </li>
      </ul>
      <ol class="swiperCpOl" ref="klkl" v-if="bannersInfo.length > 1">
        <li v-for="(yuan,index) in bannersInfo" :key="index" :class="[indexNum ==  index?'curentyuan':'']" @click="stopRunning(index)"></li>
      </ol>      
  </div>
</template>

<script>


export default {
  name: 'swiper',
  props:['bannersInfo','isRunning'],
  data:function(){
    return{
      indexNum : 0,
      timer :null,
      showSPop:{},
    }
  },
  created:function () {
    // eslint-disable-next-line no-console
    console.log(this.bannersInfo)
  },
  mounted:function(){
      // eslint-disable-next-line no-console
      console.log(this.bannersInfo)
      this.goRunning()     
  },
  methods:{
    stopRunning(index){
      let self = this;
      clearInterval(self.timer)
      self.indexNum = index
    },
    goRunning(){
      let self = this;
      if(self.isRunning){
        clearInterval(self.timer)
        self.timer = setInterval(function(){
          self.indexNum++
          if(self.indexNum > self.bannersInfo.length -1){
            self.indexNum = 0
          }
        },1000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiperCp{position: relative;left:0;top:0;z-index:0;width:100%;height: 100%;}
.swiperCpUl{width:100%;height: 100%;box-sizing: border-box;border:1px solid pink;display: flex;flex-flow: row nowrap;}
.swiperCpUl>li{width:100%;height: 100%;}

.swiperCpOl{position: absolute;left:0;bottom:0;z-index:100;width:100%;height: 20px;overflow: hidden;display:flex;flex-flow: row nowrap;justify-content: center;align-items: center;}
.swiperCpOl>li{width:14px;height: 14px;background:red;border-radius:50%;opacity: 0.2;margin-right: 10px;}
.swiperCpOl .curentyuan{opacity: 1;}



</style>
