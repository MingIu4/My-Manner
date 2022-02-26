/**
 * 全局配置
 */
let globalSettings = {
    app: {
        // Element 组件默认尺寸，支持：large、default、small
        elementSize: 'default',
        /**
         * 是否开启权限功能，权限功能提供以下鉴权支持：
         * 1、路由鉴权
         * 2、鉴权组件：<Auth></Auth>、<AuthAll></AuthAll>
         * 3、鉴权指令：v-auth、v-auth-all
         * 4、鉴权函数：this.$auth()、this.$authAll()
         */
        enablePermission: true,
        // 是否开启后端返回路由数据
        enableBackendReturnRoute: true,
        // 是否开启载入进度条
        enableProgress: true,
        // 是否开启动态标题
        enableDynamicTitle: false

    },

    // 控制台
    dashboard: {
        // 是否开启
        enable: true,
        // 控制台名称
        title: '控制台'
    },
    // 布局
    layout: {
        // 是否开启移动端适配，开启后当页面宽度小于 992px 时自动切换为移动端展示
        enableMobileAdaptation: true
    },
    // 导航栏
    menu: {
        /**
         * 导航栏模式
         * side 侧边栏模式（含主导航）
         * head 顶部模式
         * single 侧边栏模式（无主导航）
         */
        menuMode: 'head',
        // 切换主导航同时跳转页面
        switchMainMenuAndPageJump: false,
        // 次导航只保持一个子项的展开
        subMenuUniqueOpened: true,
        // 次导航是否收起
        subMenuCollapse: false
    },
    // 顶栏
    topbar: {
        // 是启主题风格
        enableThemeStyle: true,
        // 是否固定
        fixed: true,
        // 是否开启侧边栏展开收起按钮
        enableSidebarCollapse: true,
        // 是否开启面包屑导航
        enableBreadcrumb: true,
        // 是否开启导航搜索
        enableNavSearch: true,
        // 是否开启全屏
        enableFullscreen: true,
        // 是否开启页面刷新
        enablePageReload: true,
        // 是否开启应用配置（建议在生产环境关闭）
        enableAppSetting: true
    },
    // 底部版权
    copyright: {
        // 是否开启，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
        enable: true,
        // 版权信息配置，格式为：Copyright © [dates] <company>, All Rights Reserved
        dates: '2020-2022',
        company: 'Fantastic-admin',
        website: 'https://hooray.github.io/fantastic-admin'
    }
}

import settingsCustom from './settings.custom.json'
Object.assign(globalSettings, settingsCustom)

export default globalSettings
