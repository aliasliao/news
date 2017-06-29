<template>
    <el-row class="tab">
        <el-col :span="12" :offset="6">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="基本信息" name="first">
                    <dl>
                        <dt>用户名</dt>
                        <dd>{{ username }}</dd>
                        <dt>电子邮箱</dt>
                        <dd>{{ info.email }}</dd>
                    </dl>
                </el-tab-pane>
                <el-tab-pane label="订阅类别" name="second">
                    <el-transfer v-model="value" :data="data"></el-transfer>
                    <el-button type="success" @click="submit">提交</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            info: {
                email: '',
                interest: []
            },
            activeName: 'first',
            cats: [],
            data: [],
            value: []
        }),
        created () {
            axios.get(`/info/${this.username}`).then(res => {
                this.info = res.data
                for (let item of res.data.interest) {
                    this.value.push({item})
                }
            }).catch(err => {
                console.log(err)
            })

            axios.get('/category').then(res => {
                this.cats = res.data
                for (let item of res.data) {
                    this.data.push({
                        key: item.category, label: item.category, disabled: false
                    })
                }
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
            submit () {
                console.log('asdf')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tab {
        margin-top: 3em;
    }
</style>