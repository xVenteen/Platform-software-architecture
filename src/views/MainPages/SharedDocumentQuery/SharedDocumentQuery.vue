<script setup>
import { reactive, watch, ref, computed, onMounted } from 'vue';
import MainBox from '@/components/MainBox.vue';
import emitter from '@/utils/mitt.js'
import saveAs from 'file-saver'
import { queryCondForDocView, queryDocViewByCond, queryDocViewXml4ResId } from '@/api/SharedDocumentquery.js'

const datas = reactive({
    checkTime: [],
    searchCondition: [],
    searchConditionMap: new Map(),
    checkCond: '',
    formData: {/* 上传的表单格式还木有确定 */
        serialNumber: '',
        IDNumber: '',
        currentPage: 1,
        condEnumValue: ''
    },
    tableData: [
        // {
        //     name: 'hahah',/* 文档名称 */
        //     // serialNumber: 'biabiabia',/* 流水号 */
        //     // IDNumber: 'diudiuddiu',/* 身份证号码 */
        //     createtime: 'piupiupiu',/* 创建时间 */
        //     // docmentContent: 'qiuqiuqiu',
        //     pid: '',/* 患者ID */
        //     resid: '',/* 消息id */
        //     unicode: '',
        //     visitNo: ''
        // }
    ],
    total: 0,
    dialogTableVisible: false,
    XMLmsg: ''
})

onMounted(async () => {
    emitter.on('checkTime', (msg) => {
        datas.checkTime = msg.checkTime
    })
    const msg = await queryCondForDocView()
    if (msg.code === 200) {
        let map = new Map()
        msg.data.forEach(item => {
            map.set(item.code, item.descp)
        });
        datas.searchConditionMap = map
        // console.log(datas.searchConditionMap);
        datas.searchCondition = msg.data
        datas.checkCond = msg.data[0].code
    }
});

watch(() => datas.formData.currentPage, () => {
    queryClick()
})


const previewClick = async (index, row) => {
    datas.dialogTableVisible = true
    const msg = await queryDocViewXml4ResId({ id: row.resid })
    datas.XMLmsg = msg.data
    // console.log(msg);
    // console.log(row);
}

const downloadClick = async (index, row) => {
    const msg = await queryDocViewXml4ResId({ id: row.resid })
    datas.XMLmsg = msg.data
    const blob = new Blob([datas.XMLmsg])
    saveAs(blob, `${row.name}.xml`)
}

const queryClick = async () => {
    const params = {
        page: datas.formData.currentPage,
        size: 10,
        startTime: datas.checkTime[0],
        endTime: datas.checkTime[1],
        condEnumValue: datas.checkCond,
        value: datas.formData.condEnumValue
    }
    if (!params.startTime && !params.endTime) {
        ElMessage({ type: 'error', message: '请选择需要查询的时间段' })
        return
    } else if (!params.value) {
        ElMessage({ type: 'error', message: '请输入需要查询的信息' })
        return
    }
    const msg = await queryDocViewByCond(params)
    datas.total = msg.data.total
    datas.tableData = msg.data.list
}

</script>

<template>
    <MainBox title="共享文档查询" v-slot="slotProps">
        <div class="share-document">
            <div class="num-input">
                <el-radio-group v-model="datas.checkCond">
                    <el-radio v-for="data in datas.searchCondition" :label="data.code">
                        {{ data.descp }}</el-radio>
                </el-radio-group>
                <div class="num-input-group">
                    <el-input v-model="datas.formData.condEnumValue">
                        <template #prefix>
                            <div>
                                {{ datas.searchConditionMap.get(datas.checkCond) }} :
                            </div>
                        </template>
                    </el-input>
                    <el-button @click="queryClick">查询</el-button>

                </div>

            </div>
            <div class="msg-table">
                <el-table :data="datas.tableData" height="85%" style="width: 100%">
                    <el-table-column prop="id" label="ID" type="index" width="50" />
                    <el-table-column prop="name" label="文档名称" min-width="120" />
                    <!-- <el-table-column prop="serialNumber" label="流水号" min-width="180" />
                    <el-table-column prop="IDNumber" label="身份证号" min-width="180" /> -->
                    <el-table-column prop="createtime" label="创建时间" min-width="180" />
                    <el-table-column label="文档内容" min-width="180">
                        <template #default="scope">
                            <el-button type="success" size="small" @click="previewClick(scope.$index, scope.row)">预览
                            </el-button>
                            <el-button type="primary" size="small" @click="downloadClick(scope.$index, scope.row)">下载
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="table-footer">
                    <span>共{{ datas.total }}条记录，当前为第{{ datas.formData.currentPage }}页</span>
                    <el-pagination v-model:currentPage="datas.formData.currentPage" background
                        layout="prev, pager, next" :total="datas.total" />
                </div>
                <!-- ------------------------total和换页的请求还米有做------------------------------ -->
            </div>
        </div>
    </MainBox>


    <el-dialog v-model="datas.dialogTableVisible" title="XML详情">
        <el-input v-model="datas.XMLmsg" :autosize="{ minRows: 2, maxRows: 22 }" type="textarea"
            placeholder="Please input" />
    </el-dialog>
</template>

<style lang='scss' scoped>
.share-document {
    height: 100%;

    .num-input {
        .el-radio-group {
            margin-left: 20px;
        }

        .num-input-group {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .el-button {
                margin-top: 10px;
            }
        }

        // .el-select {
        //     width: fit-content;
        //     margin: 20px;
        //     margin-bottom: 10px;
        // }

        .el-input {
            width: fit-content;
            margin: 20px;
            margin-bottom: 10px;

            ::v-deep .el-input__inner {
                height: 32px;
                line-height: 32px;
            }
        }


    }

    .el-button {
        margin-left: 20px;
    }

    .msg-table {
        width: 100%;
        height: 88%;

        .el-pagination {
            float: right;
            margin: 8px 20px 0 0;
        }

        .table-footer {
            font-size: 12px;
            line-height: 500%;
        }
    }
}
</style>