<template>
    <el-container style="width: 100vw;height:100vh">
        <el-aside style="height: 100%; width: auto;">
            <menuVue :userName="userName"></menuVue>
        </el-aside>
        <el-container>
            <el-header>
                <headerVue></headerVue>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>
                <footerVue></footerVue>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script setup>
import menuVue from './menu/menu.vue';
import headerVue from './header/header.vue';
import footerVue from './footer/footer.vue'
import { ref, reactive, onBeforeUnmount, onMounted } from 'vue'
import store from '@/store/index.js'
import { getUserInfo } from '@/api/login.js'
let userName = ref('用户')

onMounted(async () => {
    store.commit('setToken', sessionStorage.getItem('x-token'))
    // console.log(sessionStorage.getItem('x-token'));
    const msg = await getUserInfo()
    if (msg.code === 200) {
        userName.value = msg.data.userName
    }
})
</script>

<style lang='scss' scoped>
.el-header {
    padding: 0;
    height: 50px;

}

.el-main {
    margin: 10px 10px 0;
    padding: 0;
}

.el-footer {
    height: 22px;
}
</style>