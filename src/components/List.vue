<template>
    <div>
        <el-card v-for="(item, index) in currentList" :key="index">
            <el-row :gutter="2">
                <el-col :sm="{span:4, offset:3}"><img :src="item.image" alt="image not found"></el-col>
                <el-col :sm="{span:12}">
                    <el-row>
                        <el-col class="title">
                            <router-link :to="'/display/article/' + item.id">{{ item.title }}</router-link></el-col>
                    </el-row>
                    <el-row>
                        <el-col class="abstract">{{ item.abstract }}</el-col>
                    </el-row>
                </el-col>
                <el-col :sm="{span:2}" class="right">
                    <div :span="24" class="source">{{ item.source }}</div>
                    <div :span="24" class="time"
                         :title="new Date(item.time).toLocaleString()">{{ parseTime(item.time) }}</div>
                </el-col>
            </el-row>
        </el-card>

        <el-pagination :page-sizes="[5, 10, 15, 20]"
                       :page-size="this.page.one"
                       :current-page="page.current"
                       :page-count="page.total"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       layout="sizes, prev, pager, next">
        </el-pagination>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'

    export default {
        name: 'list',
        data: () => ({
            list: [],
            page: {
                one: 10,
                current: 1,
                total: 1
            },
        }),
        computed: {
            cat () {
                return this.$route.params.name
            },
            currentList () {
                let start = (this.page.current - 1) * this.page.one
                let end = this.page.current * this.page.one
                return this.list.slice(start, end)
            }
        },
        methods: {
            parseTime (time) {
                return moment(time).locale('zh-cn').fromNow()
            },
            openTab (url) {
                window.open(url)
            },
            handleSizeChange (val) {
                this.page.current = 1
                this.page.one = val
                this.page.total = Math.ceil(this.list.length / this.page.one)
            },
            handleCurrentChange (val) {
                this.page.current = val
            }
        },
        created () {
            console.log('[@_@] a List is created')
            axios.get(`/cat/${this.cat}`).then(res => {
                this.list = res.data
                this.page.current = 1
                this.page.total = Math.ceil(res.data.length / this.page.one)
            }).catch(err => {
                console.log(err)
            })
        },
        watch: {
            cat (val) {
                axios.get(`/cat/${val}`).then(res => {
                    this.list = res.data
                    this.page.current = 1
                    this.page.total = Math.ceil(res.data.length / this.page.one)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        font-size: 1.3em;
        font-weight: bold;
        color: #444444;
    }
    .abstract {
        margin-top: 0.5em;
        font-size: 0.9em;
        color: dimgray;
    }
    .right {
        height: 7em;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;

        .source {
            color: #1976d2;
        }
        .time {
            margin-top: 0.5em;
            color: red;
        }
    }
    .pagination {
        display: flex;
        justify-content: center;
    }
</style>