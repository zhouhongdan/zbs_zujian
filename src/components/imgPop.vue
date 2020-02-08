<template>
    <div class="imgPopContain">
        <div class="imgPop" >
            <img :src="bannerurl" alt="" class="bannerimg" >
            <div v-if="isQQ" @click="qqlink" class="imgPopFnIcon">isQQ</div>
            <div v-if="isShowImg" @click="ispop(ShowImgurL)"  class="imgPopFnIcon">isPop</div>
            <div v-if="isLink" @click="islink(Link)"  class="imgPopFnIcon">islink</div>
        </div> 
    </div>    
</template>
<script>

    export default{
        name:'imgpop',
        props:['bannerurl','isQQ','isLink','isShowImg'],
        data:function(){
            return{
                isShow:false,
                showimgurl:''
            }
        },
        methods:{
            closeImg(){
                var self = this;
                self.isShow  = !self.isShow
            },
            qqlink(){
                alert('qq')
            },
            ispop(imgurl){
                // eslint-disable-next-line no-console
                var self = this;
                // eslint-disable-next-line no-console
                console.log(imgurl)
                if(imgurl){
                    self.showimgurl = imgurl
                    self.isShow = !self.isShow;
                    self.$emit('stopRun')
                }

            },
            islink(url){
                // eslint-disable-next-line no-console
                window.open(url)
            },
        }
    }
</script>
<style scoped>
.imgPopContain{width:100%;height: 100%;}
.imgPop{width:100%;height: 100%;overflow: hidden;position: relative;left:0;top:0;z-index:0;}
.bannerimg{width:100%;height: auto;}
.imgPopFnIcon{position: absolute;left:0;top:0;z-index:0;width:100%;height: 100%;}

.showPop{position: fixed;left:50%;top:50%;z-index:1;transform:translate(-50%,-50%)}
.mask{position: fixed;left:0;top:0;z-index:1;width:100%;height: 100%;background-color:rgba(0,0,0,0.7);}
.closeImg{position: absolute;right:0;top:0;z-index:0;width:40px;height: 40px;background:pink}
</style>