import axios from '@/utils/axios.js'

export const queryCondForDocView = () => {
    return axios({
        url: '/api/common/queryCondForDocView',
        method: 'get',
    })
}


export const queryDocViewByCond = (params) => {
    return axios({
        url: '/api/docView/queryDocViewByCond',
        method: 'get',
        params
    })
}


export const queryDocViewXml4ResId = (params) => {
    return axios({
        url: '/api/docView/queryDocViewXml4ResId',
        method: 'get',
        params
    })
}