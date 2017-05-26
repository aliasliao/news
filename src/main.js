import Vue from 'vue'
import VueRouter from 'vue-router'
//import VueMaterial from 'vue-material'
//import 'vue-material/dist/vue-material.css'
import 'roboto-fontface/css/roboto/sass/roboto-fontface.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.scss'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './components/App.vue'
import List from './components/List.vue'

Vue.use(VueRouter)
Vue.use(Vuetify)

const routes = [
    { path: '/cat/:name', component: List }
]
const router = new VueRouter({ routes })

let app = new Vue({
    el: '#app',
    router,
    render (h) {
        return h(App)
    }
})