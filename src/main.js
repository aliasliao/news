import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'

import App from './components/App.vue'
import List from './components/List.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)

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