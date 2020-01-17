<template>
    <div class="emotion">
        <div class="emotionBtn">
            <span @click="showEmotion">表情按钮</span>
        </div>
        <div class="biaqing" v-if="biaqingArray.length > 0 && emtionShow">
            <img  v-for="(item,index) in biaqingArray" :key="index" :src="item.url" :title="item.title" @click="addEmotion(item.title)">
        </div>
        <!-- <div class="caitiao">     
            <img v-for="(item,index) in caitiaoArray" :key="index" :src="require('@/assets/images/zan/'+item.url)" :title="item.title" >                  
        </div> -->
        <div class="inputBox">
            <textarea name="" id="input"  ref="input" placeholder="请发表你的意见" class="inputBtn" v-model="inputVaule"></textarea>
            <span class="sendBtn" @click="sendContent(inputVaule)">提交</span>
        </div>
        <div class="sendContent" v-html="contents"></div>
    </div>
   
</template>
<script>
import axios from 'axios'

export default {
    name:"emotion",
    data(){
        return{
            emtionShow:false,
            biaqingArray:[],
            caitiaoArray:[],
            icon1Index: 1000,
            icon2Index: 1000, 
            contents:'',
            inputVaule:''          
        }
    },
    mounted(){
        
    },
    methods:{
        showEmotion(){
            //获取本地JSon
            var self = this;
            self.emtionShow = !self.emtionShow;
            self.$get('/api/emotionJosn',{
                transformRequest:function(data){
                    console.log(data)
                },
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                params: {
                    ID: 12345
                },
                timeout: 1000,
                auth: {
                    username: 'janedoe',
                    password: 's00pers3cret'
                },

            })
            .then((msg)=>{
                console.log(msg)
                let opkl = msg.data.biaqingArray
                opkl.map(item=>{
                    item.url = require('@/assets/images/face/'+item.url)
                })
                console.log(opkl)
                self.biaqingArray = opkl
            })
            .catch(err=>{
                console.log(err)
            })
        },
        addEmotion(title){
            var self = this;
            self.inputVaule += '['+title+']' 
        },
        sendContent(str){

            var self = this
            self.inputVaule = ''
            self.$nextTick(function(){
                var list = str.match(/\[[\u4e00-\u9fa5]*\w*\]/g);
                // console.log(list)
                var filter = /[\[\]]/g;
                var title;
                console.log(self.biaqingArray)
     

                list.map((item1,index1)=>{
                    title = item1.replace(filter,'');
                    self.biaqingArray.map((item,index)=>{
                        if(item.title === title){
                            str = str.replace(item1,'<img src="'+item.url+'" class="contentImg"/>');
                        } 
                     })   
                })
                 console.log(str)
                 self.contents = str
            })

               
 
            

            
        },
        dealTitleToImg(str){
            
            
        }
    }
}
</script>
<style scoped>
.biaqing{width:498px;display: flex;flex-flow: row wrap;justify-content: start;align-items: center;}
.biaqing>img{width:40px;height: 40px;cursor: pointer;}
.caitiao{width:200px;display: flex;flex-flow: row wrap;justify-content: center;align-items: center;}

.inputBox{display:flex;width:500px;}
textarea[input]{flex:1;}
.sendBtn{width:100px;border:1px solid blue;cursor: pointer;}
.sendContent{border:1px solid red;width: 500px;height: 300px;}
</style>
