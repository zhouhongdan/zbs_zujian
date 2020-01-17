import axios from 'axios'
import router from '@/router/index.js'
import Cookies from 'js-cookie'
// 参考文章 https://www.cnblogs.com/chaoyuehedy/p/9931146.html

axios.defaults.timeout = 10000;
axios.defaults.baseURL ='';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        // return config;

        const token = Cookies.get('名称');//注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type':'application/x-www-form-urlencoded'
        }
        if(token){
          config.params = {'token':token}
        }
        return config;

    },    
    error => {
        return Promise.reject(error);
    }
)
//http response 拦截器
//http response 拦截器
axios.interceptors.response.use(
    response => {
    if(response.data.errCode ==2){
        router.push({
            path:"/login",
            querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
        })
    }
    console.log('⌚')
    return response;
},
    error => {
        return Promise.reject(error)
    }
)
/*
* 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
*/
export function get(url,params={}){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(response => {
            console.log('▶'+response)
           resolve(response.data)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

/*
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
*/
export function post(url,data={}){
    return new Promise((resolve,reject)=>{
        axios.post(url,data)
        .then(response=>{
            resolve(response.data)
        },err=>{
            reject(err)
        })
    })
}
 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}