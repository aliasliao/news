<template>
    <div>
        <el-menu :default-active="defaultRoute" class="navigate" theme="dark" mode="horizontal" router>
            <el-row>
                <el-col :xs="{span:8}" :sm="{span:4, offset:2}">
                    <el-menu-item class="logo" :index="defaultRoute">新闻资讯</el-menu-item>
                </el-col>
                <el-col v-if="!username" :xs="{span:8, offset:8}" :sm="{span:4, offset:14}">
                    <el-menu-item class="action" index="/register">
                        <el-button type="success">注册</el-button>
                    </el-menu-item>
                    <el-menu-item class="action" index="/login">
                        <el-button type="warning">登录</el-button>
                    </el-menu-item>
                </el-col>
                <el-col v-else :xs="{span:8, offset:8}" :sm="{span:4, offset:14}">
                    <el-submenu index="submenu">
                        <template slot="title">你好，{{ username }}</template>
                        <el-menu-item index="/info">我的信息</el-menu-item>
                        <el-menu-item index="" @click="logout">退出登录</el-menu-item>
                    </el-submenu>
                </el-col>
            </el-row>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'app',
        data: () => ({
            defaultRoute: '/display',
        }),
        created () {
            console.log('[@_@] an App is created')
            window.location.hash = '#/display'

            axios.get('/get/username').then(res => {
                this.$root.username = res.data
            }).catch(err => {
                console.log(err)
            })
        },
        computed: {
            username () {
                return this.$root.username
            }
        },
        methods: {
            logout () {
                let username = this.$root.username
                axios.get(`/logout/${username}`)
                    .then(res => {
                        if (res.data === 'success') {
                            this.$notify.success({
                                title: '注销成功',
                                message: '账户已注销，请重新登录'
                            })
                            this.$root.username = ''
                            window.location = '/'
                        }
                        else {
                            this.$notify.warning({
                                title: '注销失败',
                                message: res.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navigate {
        padding: 1em;
        .logo {
            font-size: 2em;
        }
        .action {
            padding: 0.2em;
        }
    }
</style>