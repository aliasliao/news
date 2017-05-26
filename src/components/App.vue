<template>
    <v-app>
        <v-toolbar>
            <v-toolbar-side-icon> light</v-toolbar-side-icon>
            <v-toolbar-title>二点资讯</v-toolbar-title>
            <v-text-field prepend-icon="search" label="Search..."
                          hide-details single-line light></v-text-field>
            <v-icon light>info</v-icon>
        </v-toolbar>
        <display></display>
    </v-app>
</template>

<script>
    import Display from './Display.vue'

    export default {
        name: 'app',
        components: {Display},
        data: () => ({
        }),
        created () {
        },
        methods: {
        }
    }
</script>

<style lang="scss">
</style>