import store from '@/store/index.js'
import Axios from 'axios'
// import { ElMessage } from 'element-plus'
// const baseURL = 'http://192.168.101.39:9021'

const axios = Axios.create({

    timeout: 10000,// 请求超时 10s
    // headers: {
    //     post: {
    //         "Access-Control-Allow-Origin": true
    //     }
    // }
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
    (config) => {
        /**
         * 根据你的项目实际情况来对 config 做处理
         * 这里对 config 不做任何处理，直接返回
         */
        config.data = JSON.stringify(config.data)
        config.headers = {
            'X-Token': store.getters.token,
            'Content-Type': 'application/json',
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
    (response) => {
        /**
         * 根据你的项目实际情况来对 response 和 error 做处理
         * 这里对 response 和 error 不做任何处理，直接返回
         */
        // console.log(response.data.code);
        if (response.data.code !== 200) {
            // ElMessage.error(`Code:${response.data.code}\nMessage:${response.data.message}`)
            ElMessage({ type: 'error', message: `错误码:${response.data.code}   错误信息:${response.data.message}` })
        }

        return response.data
    },
    (error) => {
        if (error.response && error.response.data) {
            const code = error.response.status
            const msg = error.response.data.message
            ElMessage({ type: 'error', message: `Code:${code}\nMessage:${msg}` })
            console.error(`[Axios Error]`, error.response)
        } else {
            ElMessage({ type: 'error', message: error })
        }
        return Promise.reject(error)
    }
)

export default axios