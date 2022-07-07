<template>
    <el-container style="width: 100vw;height:100vh">
        <el-aside style="height: 100%; width: auto;">
            <menuVue></menuVue>
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
import { ref, reactive } from 'vue'


</script>

<style lang='scss' scoped>
.el-header {
    // position: fixed;
    // width: auto;
    padding: 0;
    // box-sizing: border-box;
}

.el-main {
    margin-top: 50px;
}

.el-footer {
    height: 22px;
}
</style>