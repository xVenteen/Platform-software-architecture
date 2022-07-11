<script setup>
import Echarts from '@/components/echarts/echarts.vue';
import MainBox from '@/components/MainBox.vue';
import { reactive, watch, ref, computed, onMounted } from 'vue';
import { catLogReport } from '@/api/dailydata.js'
import emitter from '@/utils/mitt.js'
const datas = reactive({
    checkTime: [],
    xAxisarr: [],
    yAxisarr1: [],
})

const options = reactive(
    {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['接收条数', 'Search Engine'],
            orient: "vertical",
            right: "2%",
            top: "50%",

        },
        grid: {
            left: '3%',
            right: '19%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: datas.xAxisarr,

            splitLine: {
                show: true
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#acacac'
                },
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#acacac'
                },
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
        },
        series: [
            {
                name: '接收条数',
                type: 'line',
                stack: 'Total',
                symbolSize: 6,
                // symbol:'circle',
                itemStyle: {
                    normal: {
                        color: '#003bff',
                        lineStyle: {
                            width: 3
                        }
                    }
                },
                data: datas.yAxisarr1
            },
            // {
            //     name: 'Search Engine',
            //     type: 'line',
            //     stack: 'Total',
            //     symbol: 'circle',
            //     symbolSize: 6,
            //     itemStyle: {
            //         normal: {
            //             color: '#007bff',
            //             lineStyle: {
            //                 width: 3
            //             }
            //         }
            //     },
            //     data: [820, 932, 901, 934, 1290, 1330, 1320]
            // }
        ]
    }
)


onMounted(() => {
    emitter.on('checkTime', (msg) => {
        datas.checkTime = msg.checkTime
    })
});
watch(() => datas.checkTime, async (newValue, oldValue) => {
    const messages = await catLogReport({
        startTime: datas.checkTime[0],
        endTime: datas.checkTime[1]
    })
    if (messages.code === 200) {
        datas.xAxisarr = []
        datas.yAxisarr1 = []
        for (let msg in messages.data) {
            datas.xAxisarr.push(messages.data[msg].lodReportDay)
            datas.yAxisarr1.push(messages.data[msg].countNum)
        }
        options.xAxis.data = datas.xAxisarr
        options.series[0].data = datas.yAxisarr1
    }
})
</script>

<template>
    <MainBox title="每日数据情况" v-slot="slotProps">
        <Echarts id="dailydata" eHight="100%" eWidth="100%" :options="options"></Echarts>
    </MainBox>
</template>

<style lang='scss' scoped>
</style>