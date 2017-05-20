import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'roboto-fontface/css/roboto/sass/roboto-fontface.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.scss'

import App from './components/App.vue'

Vue.use(VueMaterial)

new Vue({
    el: '#app',
    render (h) {
        return h(App)
    }
})