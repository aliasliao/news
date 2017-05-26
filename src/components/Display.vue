<template>
    <v-container fluid>
        <v-layout row wrap class="choice">
            <v-flex xs1
                    v-for="(item, index) in cats"
                    :key="index">
                <router-link :to="'/cat/' + item.category">
                    <v-btn>
                        {{ item.category }}
                    </v-btn>
                </router-link>
            </v-flex>
        </v-layout>
        <router-view></router-view>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'display',
        data: () => ({
            cats: [],
        }),
        created () {
            axios.get('/category').then(res => {
                this.cats = res.data
            }).catch(err => {
                console.log(err)
            })
        },
        methods: {
        },
        computed: {
        }
    }
</script>

<style lang="scss">
    .choice {
        font-size: 10px;
    }
    .router-link-active {
        color: deeppink;
        background-color: deeppink;
    }
</style>