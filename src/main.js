import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import 'roboto-fontface/css/roboto/sass/roboto-fontface.scss'
//import 'material-design-icons-iconfont/dist/material-design-icons.scss'

import App from './components/App.vue'
import Display from './components/Display.vue'
import List from './components/List.vue'
import Article from './components/Article.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Info from './components/Info.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
    { path: '/display', component: Display,
        children: [
            { path: 'cat/:name', component: List },
            { path: 'article/:id', component: Article },
        ]
    },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/info', component: Info },
]
const router = new VueRouter({ routes })

let app = new Vue({
    el: '#app',
    router,
    data: {
        username: '',
        email: '',
        interest: [],
        habit: []
    },
    render (h) {
        return h(App)
    }
})