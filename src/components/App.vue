<template>
    <div>
        <md-button @click.native="getMsg">hello javascript {{ word }}</md-button>
        <md-button class="md-warn md-icon-button"><md-icon>more_vert</md-icon></md-button>
    </div>
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