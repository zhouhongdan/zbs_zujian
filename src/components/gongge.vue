<template>
    <div class="lotteryBox cen_lr pos">
        <div id="lottery" class="lottery" ref="lottery">
            <div ><img src="@/assets/images/choujiang/pic-1.png">0</div>
            <div ><img src="@/assets/images/choujiang/pic-2.png">1</div>
            <div ><img src="@/assets/images/choujiang/pic-3.png">2</div>
            <div ><img src="@/assets/images/choujiang/pic-2.png">3</div>
            <div ><img src="@/assets/images/choujiang/pic-3.png">4</div>
            <div ><img src="@/assets/images/choujiang/pic-4.png">5</div>
            <div ><img src="@/assets/images/choujiang/pic-3.png">6</div>
            <div ><img src="@/assets/images/choujiang/pic-4.png">7</div>
        </div>
        <p id="lotStartBtn"><img src="@/assets/images/choujiang/pic-5.png" @click="quanzhuang()"></p>
        <span class="stop" @click="stop()">stop</span>
    </div>
</template>
<script>
import gongge from "@/assets/js/gongge.js"
export default {
    name: 'gongge',
    data(){
        return {
            target : '',
            disable : '' ,
            fnObj : {},//函数初始化对象
        }
    },
    mounted(){
        this.zhuangObj()
    },
    methods:{
        zhuangObj(){
            let self = this
            self.fnObj =  new gongge({
                        obj: self.$refs.lottery,
                        waiting: 5000, //匀速转动时长
                        onEnd:function(){
                            console.log('结束');
                            self.disable = "";
                        }

                    })

        },
        quanzhuang(){
            let self = this
            if(this.disable == 'disable'){
                return
            }
            this.disable = 'disable'
           

            //ajax里 获取中奖 下标
            setTimeout(function(){
                Object.assign(self.fnObj,{
                    target : 3
                })
                self.fnObj._start();
            } , 100);
        },
        stop(){
            let self = this
            self.fnObj._stop();
        }
    }
}
</script>
<style scoped>
@import '../assets/css/gongge.css'
</style>