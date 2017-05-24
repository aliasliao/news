<template>
    <div>
        <md-tabs class="md-transparent" md-fixed>
            <md-tab v-for="(item, index) in categories"
                    :key="index"
                    :md-label="item.category">
                {{ item.category }}
            </md-tab>
        </md-tabs>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'display',
        data: () => ({
            response: []
        }),
        created () {
            axios.get('/category').then(response => {
                console.log(response.data)
                this.response = response.data
            })
        },
        computed: {
            categories () {
                return this.response
            }
        }
    }
</script>