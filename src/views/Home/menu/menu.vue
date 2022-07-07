<template>
    <div class="menu">
        <el-menu :router="true" :collapse="datas.unfold" active-text-color="rgb(64, 158, 255)"
            background-color="#222d32" class="el-menu" default-active="/Home/AllStatus" text-color="rgb(191, 203, 217)"
            @open="handleOpen" @close="handleClose">
            <el-menu-item class="title" index="" style="background: #00284d;">
                <div class="img"><img src="@/assets/logo.png" alt=""></div>
                <!-- --------------------------------LOGO还木有，等后面UI搞定了再填上---------------------------- -->
                <span class="text">帅哥，您好！</span>
            </el-menu-item>
            <el-menu-item index="/Home/AllStatus">
                <el-icon>
                    <span class="iconfont icon-renwuqianyue"></span>
                </el-icon>
                <span>总体情况</span>
            </el-menu-item>
            <el-menu-item index="/Home/SharedDocumentQuery">
                <el-icon>
                    <span class="iconfont icon-a-wenjianjia-zhankai"></span>
                </el-icon>
                <span>共享文档查询</span>
            </el-menu-item>
            <el-menu-item index="/Home/Azkaban">
                <el-icon>
                    <span class="iconfont icon-baobiao"></span>
                </el-icon>
                <span>Azkaban调度系统</span>
            </el-menu-item>
            <el-menu-item index="/Home/SpecialTopic">
                <el-icon>
                    <span class="iconfont icon-iconfontzhizuobiaozhun0247"></span>
                </el-icon>
                <span>专题库</span>
            </el-menu-item>
            <el-menu-item index="/Home/Metadata">
                <el-icon>
                    <span class="iconfont icon-xitongguanli"></span>
                </el-icon>
                <span>元数据管理</span>
            </el-menu-item>
        </el-menu>

    </div>

</template>

<script setup>
import '@/assets/style/iconfont.css'
import { ref, reactive, onMounted } from 'vue';
import emitter from '@/utils/mitt.js'
onMounted(() => {
    emitter.on('unfold', (msg) => {
        datas.unfold = msg.unfold
    })
});

const datas = reactive({
    unfold: false
})

</script>

<style lang='scss' scoped>
.menu {
    box-sizing: border-box;
    height: 100%;

    // .el-menu-vertical-demo:not(.el-menu--collapse) {
    //     width: 200px;
    //     min-height: 400px;
    // }

    .el-menu {
        height: 100%;
        border: 0;

        .title {
            font-size: 18px;
            font-weight: 600;
            color: rgb(225, 225, 225);

            img {
                width: 1.65vw;
                height: 1.65vw;
                vertical-align: middle;
                margin-right: 12px;
            }
        }

        .el-menu-item {
            width: 100%
        }

        .el-sub-menu .el-menu-item {
            height: var(--el-menu-sub-item-height);
            line-height: var(--el-menu-sub-item-height);
            min-width: 0px;
        }
    }
}
</style>