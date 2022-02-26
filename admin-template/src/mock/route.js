export default [
    {
        url: '/mock/route/list',
        method: 'get',
        response: () => {
            return {
                error: '',
                status: 1,
                data: [
                    {
                        // 头部菜单
                        meta: {
                            title: 'ERP',
                            icon: 'sidebar-default'
                        },
                        // 左侧菜单
                        children: [
                            {
                                path: '/multilevel_menu_example',
                                component: 'Layout',
                                redirect: '/multilevel_menu_example/page',
                                name: 'multilevelMenuExample',
                                meta: {
                                    title: '销售管理',
                                    icon: 'sidebar-menu'
                                },
                                // 二级菜单
                                children: [
                                    {
                                        path: 'page',
                                        name: 'multilevelMenuExample1',
                                        component: 'multilevel_menu_example/page.vue',
                                        meta: {
                                            title: '客户管理'
                                        }
                                    },
                                    {
                                        path: 'level2',
                                        name: 'multilevelMenuExample2',
                                        redirect: '/multilevel_menu_example/level2/page',
                                        meta: {
                                            title: '销售订单'
                                        },
                                        // 三级菜单
                                        children: [
                                            {
                                                path: 'page',
                                                name: 'multilevelMenuExample2-1',
                                                component: 'multilevel_menu_example/level2/page.vue',
                                                meta: {
                                                    title: '销售报价'
                                                }
                                            },
                                            {
                                                path: 'level3',
                                                name: 'multilevelMenuExample2-2',
                                                redirect: '/multilevel_menu_example/level2/level3/page1',
                                                meta: {
                                                    title: '订单发货'
                                                },
                                                // 四级菜单
                                                children: [ ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                path: '/multilevel_menu_example',
                                component: 'Layout',
                                redirect: '/multilevel_menu_example/page',
                                name: 'multilevelMenuExample',
                                meta: {
                                    title: '工程管理',
                                    icon: 'sidebar-menu'
                                }
                            }, {
                                path: '/multilevel_menu_example',
                                component: 'Layout',
                                redirect: '/multilevel_menu_example/page',
                                name: 'multilevelMenuExample',
                                meta: {
                                    title: '生产制造执行管理（MES）',
                                    icon: 'sidebar-menu'
                                }
                            }, {
                                path: '/multilevel_menu_example',
                                component: 'Layout',
                                redirect: '/multilevel_menu_example/page',
                                name: 'multilevelMenuExample',
                                meta: {
                                    title: '品质管理',
                                    icon: 'sidebar-menu'
                                }
                            }, {
                                path: '/multilevel_menu_example',
                                component: 'Layout',
                                redirect: '/multilevel_menu_example/page',
                                name: 'multilevelMenuExample',
                                meta: {
                                    title: '资材部',
                                    icon: 'sidebar-menu'
                                }
                            }
                        ]
                    },
                    {
                        // 头部菜单
                        meta: {
                            title: 'CRM',
                            icon: 'sidebar-default'
                        },
                        // 左侧菜单
                        children: [
                            {
                                path: '/multilevel_menu_example',
                                component: 'Layout',
                                redirect: '/multilevel_menu_example/page',
                                name: 'multilevelMenuExample',
                                meta: {
                                    title: '客户分类',
                                    icon: 'sidebar-menu'
                                },
                                // 二级菜单
                                children: [
                                    {
                                        path: 'page',
                                        name: 'multilevelMenuExample1',
                                        component: 'multilevel_menu_example/page.vue',
                                        meta: {
                                            title: '业务客户'
                                        }
                                    },
                                    {
                                        path: 'level2',
                                        name: 'multilevelMenuExample2',
                                        redirect: '/multilevel_menu_example/level2/page',
                                        meta: {
                                            title: '供应商'
                                        }
                                    },
                                    {
                                        path: 'level2',
                                        name: 'multilevelMenuExample2',
                                        redirect: '/multilevel_menu_example/level2/page',
                                        meta: {
                                            title: '物流运输商'
                                        }
                                    },
                                    {
                                        path: 'level2',
                                        name: 'multilevelMenuExample2',
                                        redirect: '/multilevel_menu_example/level2/page',
                                        meta: {
                                            title: '产品服务商'
                                        }
                                    },
                                    {
                                        path: 'level2',
                                        name: 'multilevelMenuExample2',
                                        redirect: '/multilevel_menu_example/level2/page',
                                        meta: {
                                            title: '经销商'
                                        }
                                    },
                                    {
                                        path: 'level2',
                                        name: 'multilevelMenuExample2',
                                        redirect: '/multilevel_menu_example/level2/page',
                                        meta: {
                                            title: '往来银行'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
]
