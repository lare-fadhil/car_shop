
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import languages from './languages.json'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
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
        
        car_items_list: state => state.car_items_list,
        
        cars_list: state => state.cars_list,
        
        expenses_list: state => state.expenses_list,
        
        invoice_items_list: state => state.invoice_items_list,
        
        invoices_list: state => state.invoices_list,
        
        items_list: state => state.items_list,
        
        users_list: state => state.users_list,
        
    },
    mutations: {
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
        
    },
})
        