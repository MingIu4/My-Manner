<script setup name="Tools">
const reload = inject('reload')
const router = useRouter()

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()

function userCommand(command) {
    console.log(command)
    switch (command) {
        case 'dashboard':
            router.push({
                name: 'dashboard'
            })
            break
        case 'setting':
            router.push({
                name: 'personalSetting'
            })
            break
        case 'logout':
            userStore.logout().then(() => {
                router.push({
                    name: 'login'
                })
            })
            break
    }
}
/** 默认主题色 */
onMounted(() => {
    window.document.documentElement.setAttribute('data-theme', settingsStore.themeStyle)
})
/** 主题控制 */
function styleCommand(style) {
    settingsStore.setThemeStyle(style)
    window.document.documentElement.setAttribute('data-theme', settingsStore.themeStyle)
}

</script>

<template>
    <!-- 右侧小工具 -->
    <div class="tools">
        <div class="buttons">
            <!--  全局搜索  -->
            <span v-if="settingsStore.topbar.enableNavSearch" class="item" @click="$eventBus.emit('global-search-toggle')">
                <svg-icon name="search" />
            </span>
            <!--  是否全屏  -->
            <span v-if="settingsStore.mode === 'pc' && settingsStore.topbar.enableFullscreen" class="item" @click="toggle">
                <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
            </span>
            <!--  页面刷新  -->
            <span v-if="settingsStore.topbar.enablePageReload" class="item" @click="reload()">
                <svg-icon name="toolbar-reload" />
            </span>
            <!--  全局配置  -->
            <span v-if="settingsStore.topbar.enableAppSetting" class="item" @click="$eventBus.emit('global-theme-toggle')">
                <svg-icon name="toolbar-theme" />
            </span>
            <!--  主题风格  -->
            <span v-if="settingsStore.topbar.enableThemeStyle" class="item">
                <el-dropdown class="style-container" size="default" @command="styleCommand">
                    <span>主题</span>
                    <template #dropdown>
                        <el-dropdown-menu class="style-dropdown">
                            <el-dropdown-item command="dark">drak</el-dropdown-item>
                            <el-dropdown-item command="blu">黑色</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </span>
            <el-dropdown class="user-container" size="default" @command="userCommand">
                <div class="user-wrapper">
                    <el-avatar size="small">
                        <el-icon><el-icon-user-filled /></el-icon>
                    </el-avatar>
                    {{ userStore.account }}
                    <el-icon><el-icon-caret-bottom /></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu class="user-dropdown">
                        <el-dropdown-item v-if="settingsStore.dashboard.enable" command="dashboard">控制台</el-dropdown-item>
                        <el-dropdown-item command="setting">个人设置</el-dropdown-item>
                        <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tools {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;
    .buttons {
        margin-right: 20px;
        .item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            width: 34px;
            cursor: pointer;
            vertical-align: middle;
            transition: all 0.3s;
        }
    }
}
:deep(.user-container) {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    margin-left: 10px;
    cursor: pointer;
    .user-wrapper {
        .el-avatar {
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 4px;
        }
    }
}
.style-container {
    color: rgb(252 252 251 / 89.7%);
    text-align: center;
    .span {
        font-size: 24px;
        padding: 0 10px;
    }
}

</style>
