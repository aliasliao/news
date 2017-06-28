<template>
    <div>
        <el-menu :default-ctive="defaultRoute" class="navigate" theme="dark" mode="horizontal" router>
            <el-row>
                <el-col :xs="{span:8}" :sm="{span:4}">
                    <el-menu-item :index="defaultRoute" class="logo">新闻资讯</el-menu-item>
                </el-col>
                <el-col :xs="{span:8, offset:8}" :sm="{span:4, offset:16}">
                    <el-menu-item index="2">注册</el-menu-item>
                    <el-menu-item index="3">登录</el-menu-item>
                </el-col>
            </el-row>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
    import Display from './Display.vue'

    export default {
        name: 'app',
        components: {
        },
        data: () => ({
            defaultRoute: '/display'
        }),
        created () {
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .navigate {
        padding: 1em;

        .logo {
            font-size: 2em;
        }
    }
</style>