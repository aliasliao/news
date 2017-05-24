<template>
    <div>
        <md-toolbar>
        <md-layout md-row>
            <md-layout class="logo">
                <h2 class="md-title">二点资讯</h2>
            </md-layout>
            <md-layout md-flex="60">
                <md-layout md-flex="10">
                <md-icon>search</md-icon>
                </md-layout>
                <md-layout>
                <md-input-container>
                    <label>搜索资讯</label>
                    <md-input type="text"></md-input>
                </md-input-container>
                </md-layout>
            </md-layout>
            <md-layout>
                <md-button>搜索</md-button>
            </md-layout>
            <md-layout>
                <md-icon>home</md-icon>
            </md-layout>
        </md-layout>
        </md-toolbar>
        <ul>
            <li v-for="(item, index) in categories"
                :key="index">
                {{ item.category }}
            </li>
        </ul>
    </div>
</template>

<script>
    //import Display from './Display.vue'
    import axios from 'axios'

    export default {
        //components: {Display},
        name: 'app',
        data: () => ({
            categories: []
        }),
        created () {
            axios.get('/category').then(response => {
                console.log(response.data)
                this.categories = response.data
            })
        },
        methods: {
        }
    }
</script>

<style lang="scss">
    .logo {
        justify-content: center;
        align-items: center;
    }
</style>