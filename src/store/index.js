import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            token: '',
        }
    },
    mutations: {
        setToken(state, newToken) {
            state.token = newToken
            sessionStorage.setItem('x-token', newToken)
            // console.log(sessionStorage.getItem('x-token'));
        }
    },
    getters: {
        token(state) {
            return state.token
        }
    }
})

export default store
