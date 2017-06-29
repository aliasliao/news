<template>
    <el-row class="form">
        <el-col :span="8" :offset="8">
            <el-form ref="registerForm" :model="form" :rules="rules" label-width="7em">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input type="password" v-model="form.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">注册</el-button>
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
                    axios.get(`/exist/username/${value}`).then(res => {
                        if (res.data === true) {
                            callback(new Error('用户名已被注册'))
                        }
                        else {
                            callback()
                        }
                    })
                    // callback()
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
            let validateConfirmPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                }
                else if (value !== this.form.password) {
                    callback(new Error('两次输入的密码不一致！'))
                }
                else {
                    callback()
                }
            }
            let validateEmail = (rule, value, callback) => {
                let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

                if (value === '') {
                    callback(new Error('请输入电子邮箱地址'))
                }
                else if(value.length > 128) {
                    callback(new Error('电子邮箱地址不能超过128位'))
                }
                else if (pattern.test(value) === false) {
                    callback(new Error('电子邮箱地址不合法！'))
                }
                else {
                    axios.get(`/exist/email/${encodeURI(value)}`).then(res => {
                        if (res.data === true) {
                            callback(new Error('Email地址已被注册'))
                        }
                        else {
                            callback()
                        }
                    })
                }
            }

            return {
                form: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                },
                rules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {validator: validateConfirmPassword, trigger: 'blur'}
                    ],
                    email: [
                        {validator: validateEmail, trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            submitForm () {
                this.$refs.registerForm.validate(valid => {
                    if (valid) {
                        axios.post('/register', this.form)
                            .then(res => {
                                if (res.data === 'success') {
                                    this.$notify.success({
                                        title: '注册成功',
                                        message: `用户 ${this.form.username} 成功注册`
                                    })
                                    this.$root.hasLogin = true
                                    this.$root.username = this.form.username
                                    window.location.hash = '#/display'
                                }
                                else {
                                    this.$notify.error({
                                        title: '注册失败',
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
                this.$refs.registerForm.resetFields()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form {
        margin-top: 7em;
    }
</style>
