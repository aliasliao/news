<template>
    <md-button @click.native="getMsg">hello {{ word }}</md-button>
</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            word: 'news'
        }),
        methods: {
            getMsg () {
                axios.get('/message').then(response => {
                    console.log(response.data)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>