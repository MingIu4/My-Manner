<script setup name="Login">
const { proxy } = getCurrentInstance()
const route = useRoute(),
      router = useRouter()

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

/* 用于邮箱验证的函数 */
const validateEmail = (rule, email) => {
    console.log(email)
    // 邮箱验证正则
    var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    return reg.test(email)
}

// 表单类型，login 登录，reset 重置密码
const formType = ref('login')
const loginWay = ref('account')

const loginForm = ref({
    account: localStorage.login_account || '',
    email: localStorage.login_email || '',
    password: '',
    remember: !!localStorage.login_account
})
const loginRules = ref({
    account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    password: [
        { required: true, trigger: 'blur', message: '请输入密码' },
        { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
    ],
    email: [{ validator: validateEmail, trigger: 'blur', message: '邮箱形式不正确' }]

})

const resetForm = ref({
    account: localStorage.login_account || '',
    captcha: '',
    newPassword: ''
})
const resetRules = ref({
    account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    captcha: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
    newPassword: [
        { required: true, trigger: 'blur', message: '请输入新密码' },
        { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }

    ]
})

const loading = ref(false)
const passwordType = ref('password')
const redirect = ref(null)

onMounted(() => {
    redirect.value = route.query.redirect ?? '/'
})

function showPassword() {
    passwordType.value = passwordType.value === 'password' ? '' : 'password'
    nextTick(() => {
        proxy.$refs.password.focus()
    })
}

/** 登陆回调 */
function handleLogin() {
    proxy.$refs.loginFormRef.validate(valid => {
        if (valid) {
            loading.value = true
            console.log(loginForm.value)
            // 登录请求
            userStore
                .login(loginForm.value)
                .then(() => {
                    loading.value = false

                    if (loginForm.value.remember) {
                        localStorage.setItem('login_account', loginForm.value.account)
                    } else {
                        localStorage.removeItem('login_account')
                    }
                    router.push(redirect.value)
                })
                .catch(() => {
                    loading.value = false
                })
        }
    })
}
/** 重置密码 */
function handleFind() {
    proxy.$message({
        message: '重置密码仅提供界面演示，无实际功能，需开发者自行扩展',
        type: 'info'
    })
    proxy.$refs.resetFormRef.validate(valid => {
        if (valid) {
            // 这里编写业务代码
        }
    })
}
/** 二维码登录 */
function getScanCode(params) {
    formType.value = params
}
</script>

<template>
    <div>
        <div class="bg-banner" />
        <div id="login-box">
            <div class="login-banner" />
            <el-form
                v-show="formType == 'login'"
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
                autocomplete="on"
                label-position="left"
            >
                <!-- 登陆方式 -->
                <div class="login_header">
                    <a :class="{ active: loginWay == 'account' }" @click="loginWay = 'account'">账号登录</a>
                    <a :class="{ active: loginWay == 'email' }" @click="loginWay = 'email'">邮箱登录</a>
                    <span>
                        <b />
                        <i class="iconfont icon-erweima1" title="二维码登录" @click="getScanCode('scan')" />
                    </span>
                </div>
                <!-- 账号登陆 -->
                <div v-if="loginWay == 'account'">
                    <el-form-item prop="account">
                        <el-input
                            ref="name"
                            v-model="loginForm.account"
                            placeholder="用户名"
                            type="text"
                            tabindex="1"
                            autocomplete="on"
                        >
                            <template #prefix>
                                <svg-icon name="user" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            ref="password"
                            v-model="loginForm.password"
                            :type="passwordType"
                            placeholder="密码"
                            tabindex="2"
                            autocomplete="on"
                            @keyup.enter="handleLogin"
                        >
                            <template #prefix>
                                <svg-icon name="password" />
                            </template>
                            <template #suffix>
                                <svg-icon
                                    :name="passwordType === 'password' ? 'eye' : 'eye-open'"
                                    @click="showPassword"
                                />
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <!-- 邮箱登陆 -->
                <div v-if="loginWay == 'email'">
                    <el-form-item prop="email">
                        <el-input
                            ref="email"
                            v-model="loginForm.email"
                            placeholder="邮箱"
                            type="text"
                            tabindex="1"
                            autocomplete="on"
                        >
                            <template #prefix>
                                <i class="iconfont icon-youxiang" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            ref="password"
                            v-model="loginForm.password"
                            :type="passwordType"
                            placeholder="密码"
                            tabindex="2"
                            autocomplete="on"
                            @keyup.enter="handleLogin"
                        >
                            <template #prefix>
                                <svg-icon name="password" />
                            </template>
                            <template #suffix>
                                <svg-icon
                                    :name="passwordType === 'password' ? 'eye' : 'eye-open'"
                                    @click="showPassword"
                                />
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="flex-bar">
                    <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
                    <el-button type="text" @click="formType = 'reset'">忘记密码</el-button>
                </div>
                <el-button
                    :loading="loading"
                    type="primary"
                    size="large"
                    style="width: 100%;"
                    @click.prevent="handleLogin"
                >
                    登 录
                </el-button>
            </el-form>
            <!-- 重置表单 -->
            <el-form
                v-show="formType == 'reset'"
                ref="resetFormRef"
                :model="resetForm"
                :rules="resetRules"
                class="login-form"
                auto-complete="on"
                label-position="left"
            >
                <div class="title-container">
                    <h3 class="title">重置密码</h3>
                </div>
                <div>
                    <el-form-item prop="account">
                        <el-input
                            ref="name"
                            v-model="resetForm.account"
                            placeholder="用户名"
                            type="text"
                            tabindex="1"
                            autocomplete="on"
                        >
                            <template #prefix>
                                <svg-icon name="user" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                        <el-input
                            ref="captcha"
                            v-model="resetForm.captcha"
                            placeholder="验证码"
                            type="text"
                            tabindex="2"
                            autocomplete="on"
                        >
                            <template #prefix>
                                <svg-icon name="captcha" />
                            </template>
                            <template #append>
                                <el-button>发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="newPassword">
                        <el-input
                            ref="newPassword"
                            v-model="resetForm.newPassword"
                            :type="passwordType"
                            placeholder="新密码"
                            tabindex="3"
                            autocomplete="on"
                        >
                            <template #prefix>
                                <svg-icon name="password" />
                            </template>
                            <template #suffix>
                                <svg-icon
                                    :name="passwordType === 'password' ? 'eye' : 'eye-open'"
                                    @click="showPassword"
                                />
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <el-row :gutter="15" style="padding-top: 20px;">
                    <el-col :md="6">
                        <el-button size="large" style="width: 100%;" @click="formType = 'login'">去登录</el-button>
                    </el-col>
                    <el-col :md="18">
                        <el-button
                            :loading="loading"
                            type="primary"
                            size="large"
                            style="width: 100%;"
                            @click.prevent="handleFind"
                        >
                            确 认
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
            <!-- 二维码登录 -->
            <el-form
                v-show="formType == 'scan'"
                class="login-form"
                autocomplete="on"
                label-position="left"
            >
                <!-- 登陆方式 -->
                <div class="login_header">
                    <span>
                        <b />
                        <i class="iconfont icon-xianshiqi" title="账号登录" @click="getScanCode('login')" />
                    </span>
                </div>
                <div class="scan_box">
                    <div class="wrapper" />
                </div>
            </el-form>
        </div>
        <Copyright v-if="settingsStore.copyright.enable" />
    </div>
</template>

<style lang="scss" scoped>
[data-mode="mobile"] {
    #login-box {
        max-width: 80%;
        .login-banner {
            display: none;
        }
    }
}
:deep(input[type="password"]::-ms-reveal) {
    display: none;
}
.bg-banner {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(35deg, #d5d5d5, #c1b894, #77b4dd);
}
#login-box {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgb(255 255 255 / 80%);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 5px #999;
    .login-banner {
        width: 300px;
        background-image: url("../assets/images/login-banner.jpg");
        background-size: cover;
        background-position: center center;
    }
    .login-form {
        width: 450px;
        padding: 50px 35px 30px;
        overflow: hidden;
        position: relative;
        z-index: 10;
        .title-container {
            position: relative;
            .title {
                font-size: 22px;
                color: #666;
                margin: 0 auto 30px;
                text-align: center;
                font-weight: bold;
                @include text-overflow;
            }
        }
    }
    .login-form .login_header {
        margin-bottom: 30px;
        text-align: center;
    }
    .login-form .login_header a {
        color: #303133;
        cursor: pointer;
        margin: 50px;
    }
    .login-form .login_header span {
        display: inline-block;
        position: absolute;
        width: 60px;
        height: 60px;
        right: 0;
        top: 0;
        background: rgb(234 240 242);
        z-index: 1000;
    }
    .login-form .login_header span b {
        display: inline-block;
        width: 40px;
        height: 80px;
        position: absolute;
        right: 38px;
        top: 16px;
        background: rgb(237 241 240);
        transform: rotate(-43deg);
        z-index: 10;
    }
    .login-form .login_header span i {
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 60px;
        color: rgb(133 181 207);
        cursor: pointer;
        z-index: 1;
    }
    .active {
        color: #999;
        padding-bottom: 10px;
        border-bottom: 3px solid #409eff;
    }
    :deep(.el-input) {
        height: 48px;
        line-height: inherit;
        width: 100%;
        input {
            height: 48px;
        }
        .el-input__prefix,
        .el-input__suffix {
            display: flex;
            align-items: center;
        }
        .el-input__prefix {
            left: 10px;
        }
        .el-input__suffix {
            right: 10px;
        }
    }
    .flex-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .el-checkbox {
        margin: 20px 0;
    }
}
.scan_box {
    position: relative;
    width: 340px;
    height: 265px;
    margin: 0 auto;
}
.scan_box .wrapper {
    position: absolute;
    top: -20px;
    left: 25px;
    width: 280px;
    height: 245px;
    border: 1px solid #303133;
    background: #ccc;
}
.copyright {
    position: absolute;
    bottom: 30px;
    width: 100%;
    margin: 0;
    mix-blend-mode: difference;
}
</style>
