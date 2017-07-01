<template>
    <el-row class="tab">
        <el-col :span="12" :offset="6">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane class="info" label="基本信息" name="first">
                    <el-row>
                        <el-col :span="8">
                            <div class="header">注册信息</div>
                            <dl>
                                <dt>用户名</dt>
                                <dd>{{ username }}</dd>
                                <dt>电子邮箱</dt>
                                <dd>{{ email }}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="8">
                            <div class="header">已订阅</div>
                            <ul>
                                <li v-for="(cat, index) in checkedCats" :key="index">{{ cat }}</li>
                            </ul>
                        </el-col>
                        <el-col :span="8">
                            <div class="header">浏览习惯</div>
                            <ol>
                                <li v-for="(habit, index) in habit" :key="index">{{ habit.cat }} -> {{ habit.count }}</li>
                            </ol>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="订阅类别" name="second">
                    <el-checkbox-group class="checkboxGroup"
                                       v-model="checkedCats">
                        <el-row>
                            <el-col :span="6" v-for="(cat, index) in cats" :key="index">
                                <el-checkbox :label="cat"
                                             :key="cat">
                                    {{ cat }}
                                </el-checkbox>
                            </el-col>
                        </el-row>
                    </el-checkbox-group>
                    <el-button class="submit" type="success" @click="submit">提交</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            activeName: 'first',
            cats: [],
        }),
        created () {
            axios.get('/category').then(res => {
                this.cats = res.data
            }).catch(err => {
                console.log(err)
            })
        },
        computed: {
            username () {
                return this.$root.username
            },
            email () {
                return this.$root.email
            },
            checkedCats () {
                return this.$root.interest
            },
            habit () {
                return this.$root.habit
            },
        },
        methods: {
            submit () {
                axios.post(`/setInterest`, this.checkedCats).then(res => {
                    if (res.data === 'success') {
                        this.$notify.success({
                            title: '设置成功',
                            message: '将会为你显示更适合你的新闻'
                        })
                        window.location.hash = '#/display'
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tab {
        margin-top: 3em;
        .header {
            font-weight: bold;
            font-size: 1.5em;
            margin-top: 1.5em;
        }
        dt {
            font-weight: bold;
            margin-top: 0.8em;
        }
        .checkboxGroup {
            font-size: 2em;
        }
        .submit {
            margin-top: 1em;
        }
    }
</style>