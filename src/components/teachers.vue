<template>
    <div class="teachers">
        <swiper-cp :bannersInfo="bannersInfo" :isRunning="isRunning">
            <template v-slot:default="klkl">
                <img v-if="klkl.banner.imageUrl" :src="klkl.banner.imageUrl" alt="" class="bannerimg" >
                <div v-if="klkl.isQQ" @click="qqlink" class="imgPopFnIcon">isQQ</div>
                <div v-if="klkl.banner.imageUrl" @click="ispop(klkl.banner.imageUrl)"  class="imgPopFnIcon">showUrl</div>
                <div v-if="klkl.Link" @click="islink(klkl.Link)"  class="imgPopFnIcon">islink</div>

            </template>
          </swiper-cp>
    </div>
</template>
<script>
import swiperCp from './swiperCp.vue'
import base from "@/request/base"
import axios from 'axios'
export default {
    name:'teachers',
    data(){
        return{
            bannersInfo:{},
            isRunning: true,
        }
    },
    components:{
        swiperCp
    },
    mounted(){
        this.getImages()
    },
    methods:{
        getImages() {
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
      ispop(url){
          console.log(url)
      }
    }

}
</script>
<style  scoped>

</style>