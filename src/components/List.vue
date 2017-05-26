<template>
    <div>
        <v-list three-line>
            <v-list-item v-for="(item, index) in currentList"
                         :key="index">
                <v-list-tile ripple class="mt-2">
                    <v-container fluid>
                        <v-layout row>
                            <v-flex md2 offset-md1>
                                <img :src="item.image" width="120px" height="80px" alt="Image Not Found">
                            </v-flex>
                            <v-flex md7 class="pt-1">
                                <div class="title mb-1">{{ item.title }}</div>
                                <div class="summary">{{ item.summary }}</div>
                            </v-flex>
                            <v-flex md2 class="but pl-5">
                                <div :title="item.timeline" class="time">{{ parseTime(item.timeline) }}</div>
                                <div class="source">{{ item.source }}</div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-list-tile>
                <v-divider></v-divider>
            </v-list-item>
        </v-list>
        <div class="pagination">
            <v-pagination :length.number="page.total"
                          v-model="page.current"
                          class="mt-3">
            </v-pagination>
        </div>
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
                return moment(time).fromNow()
            }
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
        font-size: 1.2em;
        font-weight: bold;
        color: #444444;
    }
    .summary {
        font-size: 0.9em;
        color: dimgray;
    }
    .time {
        color: red;
    }
    .source {
        color: #1976d2;
    }
    .but {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .pagination {
        display: flex;
        justify-content: center;
    }
</style>