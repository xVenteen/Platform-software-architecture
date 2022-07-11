import axios from '@/utils/axios.js'

export const login = (data) => {
    return axios({
        url: '/api/auth/login',
        method: 'post',
        data
    })
}


export const getUserInfo = () => {
    return axios({
        url: '/api/auth/getUserInfo',
        method: 'get',
    })
}
