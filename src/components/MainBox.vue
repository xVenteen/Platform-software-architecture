<script setup>
import { reactive, watch, defineProps } from 'vue';
import emitter from '@/utils/mitt.js'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const props = defineProps({
    title: {
        type: String,
        default: "标题",
        required: false
    }
})

const datas = reactive({
    checkTime: [],
})

watch(() => datas.checkTime, async (newValue, oldValue) => {
    emitter.emit('checkTime', { checkTime: datas.checkTime })/* 把选择的日期发送给父组件,[DailyData,] */
}
)
</script>

<template>
    <div class="main-box">
        <div class="header">
            <div class="title">{{ props.title }}</div>
            <div class="btn-group">
                <div class="left">
                    <el-button>分享</el-button>
                    <el-button>导出</el-button>
                </div>
                <el-date-picker :locale="zhCn" v-model="datas.checkTime" value-format="YYYY-MM-DD hh:mm:ss"
                    type="daterange" unlink-panels range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"
                    :shortcuts="shortcuts" :size="size" />
            </div>
        </div>
        <hr>
        <div class="main">
            <slot :time="datas.time"></slot>
        </div>
    </div>

</template>

<style lang='scss' scoped>
.main-box {
    width: 100%;
    height: 100%;

    .header {
        display: flex;
        justify-content: space-between;

        .title {
            font-size: 26px;
            font-weight: 400;
        }

        .btn-group {
            display: flex;
            align-items: center;

            .left {
                margin-right: 18px;
            }
        }
    }

    .main {
        height: 90%;
    }
}
</style>