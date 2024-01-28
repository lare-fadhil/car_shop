
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import languages from './languages.json'
import { auth } from '../firebase'
import router from '../router/index'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        auth: {
            isAuth: false,
            user: null
        },
        user:{},
        init_state: false,

        languages: languages,
        language: languages[1],
        
        car_items_list: [],
        
        cars_list: [],
        
        expenses_list: [],
        
        invoice_items_list: [],
        
        invoices_list: [],
        
        items_list: [],
        
        users_list: [],
        
    },
    getters: {
        language: state => state.language,
        languages: state => state.languages,
        auth: state => state.auth,
        user: state => state.user,

        car_items_list: state => state.car_items_list,
        
        cars_list: state => state.cars_list,
        
        expenses_list: state => state.expenses_list,
        
        invoice_items_list: state => state.invoice_items_list,
        
        invoices_list: state => state.invoices_list,
        
        items_list: state => state.items_list,
        
        users_list: state => state.users_list,
        
    },
    mutations: {
        setAuth(state, payload) {
            state.auth.user = payload.user
            state.auth.isAuth = true
            localStorage.setItem('auth', JSON.stringify(auth))
        },

        setLanguage(state, language) {
            state.language = language
        },

        setCarItemsList(state, car_items_list) {
            state.car_items_list = car_items_list
        },
        
        setCarsList(state, cars_list) {
            state.cars_list = cars_list
        },
        
        setExpensesList(state, expenses_list) {
            state.expenses_list = expenses_list
        },
        
        setInvoiceItemsList(state, invoice_items_list) {
            state.invoice_items_list = invoice_items_list
        },
        
        setInvoicesList(state, invoices_list) {
            state.invoices_list = invoices_list
        },
        
        setItemsList(state, items_list) {
            state.items_list = items_list
        },
        
        setUsersList(state, users_list) {
            state.users_list = users_list
        },
        
    },
    actions: {
        init(context, uid) {
            const id = uid
            // const id = 'yn5lsqU1MwZPOPfSAUR7tmQ8be82'
            axios.get('init/' + id)
                .then(r => {
                    if (r.status == 200 && r.data) {
                        context.commit('setAuth', {
                            user: r.data.user
                        })
                       
                        // context.commit('setCustomersList', r.data.customers)
                        context.commit('setUsersList', r.data.users)
                        context.commit('setItemsList', r.data.items)
                        // context.commit('setStoreInformation', r.data.store_information)
                        // context.commit('setItemColorsList', r.data.item_colors)
                        // context.commit('setItemTypesList', r.data.item_types)
                        // context.commit('setItemSizesList', r.data.item_sizes)
                        // context.commit('setShopItemsList', r.data.shop_items)
                        // context.commit('setDriversList', r.data.drivers)
                        context.state.user = r.data.user
                        context.state.init_state = true
                    } else {

                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        logout(context) {
            auth.signOut()
            localStorage.removeItem('auth')
            context.state.auth.isAuth = false
            router.push('/login')
            context.state.init_state = true
        },
    },
})
        