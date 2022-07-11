<script setup>
import '@/assets/style/iconfont.css'
import { ref, reactive, onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from "vue-router"  // 引入userRouter
import { login } from '@/api/login.js'
import store from '@/store/index.js'

onMounted(() => {
    store.commit('setToken', sessionStorage.getItem('x-token'))
})
const rules = reactive(
    {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ]
    }
)
const formdata = reactive({
    username: '',
    password: '',
})

const data = reactive({
    isShowPsw: true,
    pswType: 'password'
})

const eyeClick = () => {
    data.isShowPsw = !data.isShowPsw
    data.pswType = data.isShowPsw ? 'password' : 'text'
}

const loginForm = ref(null)
const router = useRouter()
const loginClick = () => {
    if (!loginForm) return
    loginForm.value.validate(async (valid) => {
        if (valid) {
            const msg = await login(formdata)
            if (msg.code === 200) {
                store.commit('setToken', msg.data.token)
                router.push({ path: '/Home' })
            }

        } else {
            return false
        }

    })
}
</script>

<template>
    <div class="login">
        <div class="title">
            <!-- <img src="@/assets/logo2.png" alt=""> -->
            <span class="title-text">共享文档查询</span>
        </div>
        <div class="input-group">
            <el-form ref="loginForm" :rules="rules" :model="formdata" class="demo-form-inline">
                <el-form-item prop="username">
                    <el-input v-model="formdata.username" placeholder="用户名">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <span class="iconfont icon-yonghu"></span>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="formdata.password" :type="data.pswType" placeholder="密码">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <span class="iconfont icon-mima"></span>
                            </el-icon>
                        </template>
                        <template #suffix>
                            <el-icon class="el-input__icon">
                                <span v-show="data.isShowPsw" class="iconfont icon-biyanjing psw-icon"
                                    @click="eyeClick"></span>
                                <span v-show="!data.isShowPsw" class="iconfont icon-yanjing_xianshi psw-icon"
                                    @click="eyeClick"></span>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginClick(loginForm)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="footer">
            <span style="margin-right: 18px;">技术支持：佳缘科技股份有限公司</span>
            <span>联系电话：02863372332版本号：V 1.0</span>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #2d3a4b;

    .title {
        display: flex;
        flex-direction: column;
        justify-content: center;

        img {
            width: 200px;
        }

        .title-text {
            margin: 29px 0 20px;
            text-align: center;
            font-size: 26px;
            color: white;
            font-weight: 700;

        }
    }

    .input-group {
        width: 480px;

        .iconfont {
            font-size: 20px;
        }

        // .el-form-item {
        //     // margin-bottom: 0;

        // }

        .el-input {
            height: 54px;
            width: 100%;
            --el-input-border-color: hsla(0, 0%, 100%, .1);

            ::v-deep .el-input__inner {
                color: #fff;
            }

            ::v-deep .el-input__wrapper {
                background-color: rgba(0, 0, 0, 0.1) !important;
                // background: rgba(0, 0, 0, .1);
                border-radius: 5px;
                color: #454545
            }

            ::v-deep input::-webkit-input-placeholder {
                color: #cbcbcb !important;
            }

            ::v-deep input::-moz-input-placeholder {
                color: #cbcbcb !important;
            }

            ::v-deep input::-ms-input-placeholder {
                color: #cbcbcb !important;
            }

            .psw-icon {
                cursor: pointer;
            }
        }

        .el-button {
            width: 100%;
            height: 40px;
        }
    }

    .footer {
        font-size: 14px;
        color: #fff;
    }
}
</style>