import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import App from './components/App.vue'

Vue.use(VueMaterial)

new Vue({
    el: '#app',
    render (h) {
        return h(App)
    }
})