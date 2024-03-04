
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import './assets/main.css' 

Vue.config.productionTip = false
import axios from 'axios'
// let api = 'https://api.thepiston.net/'
let api = 'http://localhost:3000/'
axios.defaults.baseURL = api;
axios.defaults.headers.post['Content-Type'] = 'application/json';



new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
        
        