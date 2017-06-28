<template>
    <div>
        <el-row class="article">
            <el-col :span="16" :offset="4">
                <div class="title">{{ article.title }}</div>
                <div class="info">
                    <i class="el-icon-edit"></i><span class="source">{{ article.source }}</span>
                    <i class="el-icon-time"></i><span class="time">{{ new Date(article.time).toLocaleString() }}</span>
                </div>
                <hr>
                <div class="content" v-html="article.content"></div>
            </el-col>
            <el-col :span="4"></el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'article',
        data: () => ({
            id: '',
            article: {}
        }),
        created () {
            console.log('@_@ an article is created')
            this.id = this.$route.params.id

            axios.get(`/news/${this.id}`).then(res => {
                this.article = res.data
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style lang="scss" scoped>
    .article {
        .title {
            font-size: 2em;
            font-weight: bold;
            margin-top: 2em;
            text-align: center;
        }
        .info {
            font-size: 0.8em;
            margin-top: 1em;
            color: dimgray;
            text-align: center;
            .source {
                margin-left: 0.2em;
                margin-right: 0.6em;
            }
            .time {
                margin-left: 0.2em;
            }
        }
        .content {
            margin-top: 1em;
        }
    }
</style>