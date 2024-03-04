
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./../views/Home.vue'),
        meta:{
            auth : false,
            title : 'Home'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./../views/Login.vue'),
        meta: {
            auth: false,
            title: 'Login'
        }
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: () => import('./../views/ResetPassword.vue'),
        meta: {
            auth: false,
            title: 'Login'
        }
    },
    {
        path:'/report',
        name:'Report',
        component: () => import('./../views/Reports/Reports.vue'),
        meta:{
            auth : true,
            title : 'Report'
        }
    },
        {
            path: '/car_items-list',
            name: 'ListCar_items',
            component: () => import('./../views/Car_items/List.vue'),
            meta:{
                auth : true,
                title : 'Car_items List'
            }
        },
            {
            path: '/car_items-list/:id',
            name: 'ViewCar_items',
            component: () => import('./../views/Car_items/Edit.vue'),
            meta:{
                auth : true,
                title : 'Car_items Edit'
            }
        },
        {
            path: '/cars-list',
            name: 'ListCars',
            component: () => import('./../views/Cars/List.vue'),
            meta:{
                auth : true,
                title : 'Cars List'
            }
        },
            {
            path: '/cars-list/:id',
            name: 'ViewCars',
            component: () => import('./../views/Cars/Edit.vue'),
            meta:{
                auth : true,
                title : 'Cars Edit'
            }
        },
            {
            path: '/cars-info/:id',
            name: 'CarsInfo',
            component: () => import('./../views/Cars/CarInfo.vue'),
            meta:{
                auth : true,
                title : 'Cars Info'
            }
        },
        {
            path: '/expenses-list',
            name: 'ListExpenses',
            component: () => import('./../views/Expenses/List.vue'),
            meta:{
                auth : true,
                title : 'Expenses List'
            }
        },
            {
            path: '/expenses-list/:id',
            name: 'ViewExpenses',
            component: () => import('./../views/Expenses/Edit.vue'),
            meta:{
                auth : true,
                title : 'Expenses Edit'
            }
        },
        {
            path: '/invoice_items-list',
            name: 'ListInvoice_items',
            component: () => import('./../views/Invoice_items/List.vue'),
            meta:{
                auth : true,
                title : 'Invoice_items List'
            }
        },
            {
            path: '/invoice_items-list/:id',
            name: 'ViewInvoice_items',
            component: () => import('./../views/Invoice_items/Edit.vue'),
            meta:{
                auth : true,
                title : 'Invoice_items Edit'
            }
        },
        {
            path: '/invoices-list',
            name: 'ListInvoices',
            component: () => import('./../views/Invoices/List.vue'),
            meta:{
                auth : true,
                title : 'Invoices List'
            }
        },
        {
            path: '/invoices-view',
            name: 'ListInvoices',
            component: () => import('./../views/Invoices/View.vue'),
            meta:{
                auth : true,
                title : 'Invoices List'
            }
        },
            {
            path: '/invoices-list/:id',
            name: 'ViewInvoices',
            component: () => import('./../views/Invoices/Edit.vue'),
            meta:{
                auth : true,
                title : 'Invoices Edit'
            }
        },
        {
            path: '/items-list',
            name: 'ListItems',
            component: () => import('./../views/Items/List.vue'),
            meta:{
                auth : true,
                title : 'Items List'
            }
        },
            {
            path: '/items-list/:id',
            name: 'ViewItems',
            component: () => import('./../views/Items/Edit.vue'),
            meta:{
                auth : true,
                title : 'Items Edit'
            }
        },
        {
            path: '/users-list',
            name: 'ListUsers',
            component: () => import('./../views/Users/List.vue'),
            meta:{
                auth : true,
                title : 'Users List'
            }
        },
            {
            path: '/users-list/:id',
            name: 'ViewUsers',
            component: () => import('./../views/Users/Edit.vue'),
            meta:{
                auth : true,
                title : 'Users Edit'
            }
        },
]
const router = new VueRouter({
    routes,
    mode:'history'
})

export default router
        