<!-- 课程表-->
<template>
    <div class="classBox">
        <p v-for="(item,index) in classInfo" :key="index" :class="[currentTime == index?'currentTime':'']">{{item.teacher}}</p>
    </div>  
</template>
<script>
export default {
    name:'',
    props:['keys'],
    data(){
        return{
            currentTime: 100,
            classInfo: [
                {
                    teacher: '老师1',
                    time: '16:00-16:30'
                },
                {
                    teacher: '休息',
                    time: '16:30-16:45'
                },
                {
                    teacher: '老师2',
                    time: '16:45-16:59'
                }
            ],
        }
    },
    mounted(){
        let self = this;
        console.log('⌨'+this.keys)
        setTimeout(function(){
            self.getTimeallFn()
        },1000)

    },
    methods:{
        getTimeallFn() {
            var self = this;
            var arraytime = [];
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var day = time.getDate();
            var todayTime = `${year}/${month}/${day}`;
            self.classInfo.forEach(function (item, index) {
            let time = item.time.toString().split('-')
            arraytime.push({
                index: index,
                dayTimeS: `${todayTime} ${time[0]}:00`,
                dayTimeE: `${todayTime} ${time[1]}:00`
            })
            })
            // eslint-disable-next-line no-console
            console.log(arraytime)
            let nowString = time.getTime().toString().substring(0, 10);
            // eslint-disable-next-line no-console
            console.log('new' + nowString)
            arraytime.forEach(function (item) {
            let TimeSToStr = new Date(item.dayTimeS).getTime().toString().substring(0, 10);
            let TimeEToStr = new Date(item.dayTimeE).getTime().toString().substring(0, 10);
            // eslint-disable-next-line no-console
            console.log('tiS' + TimeSToStr)
            // eslint-disable-next-line no-console
            console.log('tiE' + TimeEToStr)
            if (nowString >= TimeSToStr && nowString <= TimeEToStr) {
                self.currentTime = parseInt(item.index)
                // eslint-disable-next-line no-console
                console.log('current===' + self.currentTime)
            }
            })

        },
    }
}
</script>
<style  scoped>
.classBox{width:500px;height: 300px;background:yellow;}
.currentTime{color:green}
</style>