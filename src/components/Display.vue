<template>
    <div>
        <el-menu mode="horizontal" :default-active="defaultActive" router>
            <el-menu-item v-for="(item, index) in cats"
                          :key="index"
                          :index="'/display/cat/' + item.category">
                {{ item.category }}
            </el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'display',
        data: () => ({
            cats: [],
            defaultActive: '/cat/'
        }),
        created () {
            console.log('[@_@] a Display is created')
            axios.get('/category').then(res => {
                this.cats = res.data
                this.defaultActive = '/cat/' + this.cats[0].category
                window.location.hash = '#/display/cat/' + this.cats[0].category
            }).catch(err => {
                console.log(err)
            })
        },
        methods: {
        },
        computed: {
        },
        watch: {
        }
    }
</script>

<style lang="scss" scoped>
    /*.router-link-active {*/
        /*color: deeppink;*/
        /*background-color: deeppink;*/
    /*}*/
</style>