<template>
    <div class="imgPop" >
        <img :src="bannerurl" alt="" class="bannerimg" >
        <div class="states">
            <div v-if="isQQ" @click="qqlink">isQQ</div>
            <div v-if="isShowImg" @click="ispop(isShowImg)">isPop</div>
            <div v-if="isLink" @click="islink(isLink)">islink</div>
        </div>
        <div class="mask" v-show="isShow"></div>
        <div class="showPop" v-show="isShow">
            <img :src="showimgurl" alt="" >
            <span class="closeImg" @click="closeImg"></span>
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
.bannerimg{width:500px;}
.states{display: flex;justify-content: center;align-items: center;}
.states>div{padding:0 10px;}

.showPop{position: absolute;left:50%;top:50%;z-index:0;transform:translate(-50%,-50%)}
.mask{position: absolute;left:0;top:0;z-index:0;width:100%;height: 100%;background-color:rgba(0,0,0,0.7);}
.closeImg{position: absolute;right:0;top:0;z-index:0;width:40px;height: 40px;background:pink}
</style>