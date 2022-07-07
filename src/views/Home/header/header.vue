<template>
    <div class="header">
        <div class="left">
            <div>
                <span v-show="!datas.unfold" class="iconfont icon-zhankaicaidan" @click="opmenu"></span>
                <span v-show="datas.unfold" class="iconfont icon-guanbicaidan" @click="opmenu"></span>
            </div>

            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="rou in routerArr">{{ rou }}
                </el-breadcrumb-item>
                <!-- <el-breadcrumb-item></el-breadcrumb-item> -->
            </el-breadcrumb>
        </div>
        <div class="right">
            <el-dropdown>
                <span class="el-dropdown-link">
                    管理员
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item divided>修改密码</el-dropdown-item>
                        <el-dropdown-item divided>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import '@/assets/style/iconfont.css'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from "vue-router"  // 引入userRouter
import { ref, toRef, reactive, watch } from 'vue'
import emitter from '@/utils/mitt.js'
const router = useRouter()
let routerArr = ref([])
watch(() => router.currentRoute.value.fullPath, (newValue, oldValue) => {
    routerArr.value = newValue.split('/')
    routerArr.value.shift()
})
const datas = reactive({
    unfold: false
})
const opmenu = () => {
    datas.unfold = !datas.unfold
    emitter.emit('unfold', { unfold: datas.unfold })
}
</script>

<style lang='scss' scoped>
.header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

    .left {
        display: flex;
        align-items: center;

        .iconfont {
            font-size: 16px;
            // font-weight: 600;
            margin: 0 20px;
            cursor: pointer;
        }
    }

    .right {
        margin-right: 20px;
        cursor: pointer;

        .el-dropdown-link {
            align-items: baseline;
        }
    }
}
</style>