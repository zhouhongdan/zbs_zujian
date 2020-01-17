import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

    import swiperCp from '@/components/swiperCp'
console.log('12')
const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'home',
            component:swiperCp
        }
    ]
})
export default router