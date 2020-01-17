import base from '@/request/base'
import {get} from '@/request/http'
// import qs from 'qs'

const article ={
   
    // post提交
    login() {
        // eslint-disable-next-line no-console
        return get(`${base.bd}song/url?id=33894312`)
    }
    // 其他接口…………
}
export default article