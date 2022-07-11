import axios from '@/utils/axios.js'

export const catLogReport = (params) => {
    return axios({
        url: '/api/logReport/catLogReport',
        method: 'get',
        params
    })
}