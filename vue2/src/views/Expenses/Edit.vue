
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
        <v-container v-else class="my-2">
            <form @submit.prevent="updateExpenses" autocomplete="off">
                <v-layout row wrap>
        
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="expenses.expense_amount" type="text" :label="$store.getters.language.data.expenses.expense_amount" 
                            class="mx-1"  filled outlined dense required >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="expenses.expense_note" type="text" :label="$store.getters.language.data.expenses.expense_note" 
                            class="mx-1"  filled outlined dense  >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="expenses.expense_date" type="datetime-local" :label="$store.getters.language.data.expenses.expense_date" 
                            class="mx-1"  filled outlined dense  >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-select class="mx-1" clearable  :items="users" v-model="expenses.user_id" dense  filled outlined  item-text="user_id"
                                    item-value="user_id" :return-object="false" :label="$store.getters.language.data.users.user_id">
                        </v-select>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md2 sm4>
                        <v-btn  color="success"    type="submit">{{$store.getters.language.data.expenses.update_btn}}</v-btn>
                    </v-flex>
                </v-layout>
            </form>
        </v-container>
    <v-snackbar v-model="snackbar.value" :color="snackbar.color">
        {{snackbar.text}}
    </v-snackbar>
</div>
</template>
<script>
    import requests from './../../requests/expenses.request.js'
    export default {
        data() {
            return {
                expenses: {},
                id: '',
                loading: true,
                snackbar: {
                    value: false,
                    text: '',
                    color: ''
                },
            }
        },
        computed: {
            
                    users(){
                        return this.$store.getters.users_list
                    },
                    
        },
        mounted(){
            this.id = this.$route.params.id
            this.getOneExpenses()
        },
        methods: {
            getOneExpenses() {
                this.loading = true
                requests.getOneExpenses(this.id).then(r =>{
                    if (r.status == 200) {
                        this.expenses = r.data.row
                        this.loading = false
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to read Expenses',
                            color: 'error'
                        }
                    }
                })
                .catch(e => {
                    this.snackbar = {
                        value: true,
                        text: 'Fail to read Expenses',
                        color: 'error'
                    }
                })
                .finally(() => {
                    this.loading = false
                })
            },
            updateExpenses() {
                this.loading = true
                requests.updateExpenses(this.id,this.expenses).then(r => {
                    if (r.status == 200) {
                        this.snackbar = {
                            value: true,
                            text: 'Expenses Updated',
                            color: 'success'
                        }
                        this.loading = false
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Update Faild',
                            color: 'error'
                        }
                        this.loading = false
                    }
                })
                .catch(e => {
                    this.snackbar = {
                        value: true,
                        text: 'Update Faild',
                        color: 'error'
                    }
                    this.loading = false
                })
                .finally(() => {
                    this.loading = false
                })
            },
        },
    }
</script>
                    