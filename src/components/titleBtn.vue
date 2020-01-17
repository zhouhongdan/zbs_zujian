<template>
    <div class="titleBtn" v-on="$listeners" v-bind="$attrs">
        <img :src="icon" alt="" class="titleIcon">
        <span class="titleText">{{iconText}}</span>
    </div>      
</template>
<script>
console.log('11')
export default{
    name:"titleBtn",
    props:['icon','iconText'],
    data:function(){
        return{

        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>
<style scoped>
.titleBtn{display: flex;justify-content: center;align-items: center;}
.titleIcon{width:22px;height: 22px;}
.titleText{height: 22px;line-height: 22px;font-size:16px;color:red;}
</style>