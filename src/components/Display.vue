<template>
    <div>
        <el-menu mode="horizontal" :default-active="defaultActive" router>
            <el-menu-item v-for="(item, index) in cats"
                          :key="index"
                          :index="'/display/cat/' + item">
                {{ item }}
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
                let rawCats = res.data

                if (this.username !== undefined) {
                    for (let h of this.habit) {
                        this.cats.push(h.cat)
                    }
                    for (let c of rawCats) {
                        if (! this.cats.includes(c)) {
                            this.cats.push(c)
                        }
                    }

                    this.cats.unshift('推荐')
                }
                else {
                    this.cats = rawCats
                }

                this.defaultActive = '/cat/' + this.cats[0]
                window.location.hash = '#/display/cat/' + this.cats[0]
            }).catch(err => {
                console.log(err)
            })
        },
        methods: {
        },
        computed: {
            username () {
                return this.$root.username
            },
            checkedCats () {
                return this.$root.interest
            },
            habit () {
                return this.$root.habit
            },
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