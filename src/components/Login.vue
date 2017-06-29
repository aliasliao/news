<template>
    <el-row class="form">
        <el-col :span="8" :offset="8">
            <el-form ref="loginForm" :model="form" :rules="rules" label-width="7em">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">登录</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import axios from 'axios'

    export default {
        data () {
            let validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'))
                }
                else if (value.length < 2 || value.length > 8) {
                    callback(new Error('用户名长度在2到8个字符之间'))
                }
                else {
                    callback()
                }
            }
            let validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                }
                else if (value.length < 6 || value.length > 16) {
                    callback(new Error('密码长度在8到16个字符之间'))
                }
                else {
                    callback()
                }
            }

            return {
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            submitForm () {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        axios.post('/login', this.form)
                            .then(res => {
                                if (res.data === 'success') {
                                    this.$notify.success({
                                        title: '登录成功',
                                        message: `用户 ${this.form.username} 成功登录`
                                    })
                                    this.$root.hasLogin = true
                                    this.$root.username = this.form.username
                                    window.location.hash = '#/display'
                                }
                                else {
                                    this.$notify.error({
                                        title: '登录失败',
                                        message: res.data
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                    else {
                        console.log('form invalid!')
                    }
                })
            },
            resetForm () {
                this.$refs.loginForm.resetFields()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form {
        margin-top: 6em;
    }
</style>