
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
            <v-container v-else class="my-2">
                            			<h1 class="mt-4 mb-7">زیادکردنی خەرجی : </h1>

                <form @submit.prevent="addExpenses" autocomplete="off">
                    <v-layout row wrap>
        
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="expenses.expense_amount" type="text" :label="$store.getters.language.data.expenses.expense_amount" dense
                            class="mx-1"  filled outlined  required>
                        </v-text-field>
                    </v-flex>
                
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="expenses.expense_note" type="text" :label="$store.getters.language.data.expenses.expense_note" dense
                            class="mx-1"  filled outlined >
                        </v-text-field>
                    </v-flex>
                   <!-- <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="expenses.expense_date" type="datetime-local" :label="$store.getters.language.data.expenses.expense_date" dense
                            class="mx-1"  filled outlined >
                        </v-text-field>
                    </v-flex> -->
                        <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-select class="mx-1" clearable  :items="users" v-model="expenses.user_id" dense  filled outlined  item-text="user_name"
                                    item-value="user_id" :return-object="false" :label="$store.getters.language.data.users.user_name" disabled>
                                </v-select>
                        </v-flex>
                
                        <v-flex xs12 lg2 xl2 md2 sm4>
                            <v-btn  color="primary" :loading="loading_btn" type="submit" >{{$store.getters.language.data.expenses.add_btn}}</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
<v-layout row wrap mt-5>
    <v-flex xs12>
        <v-text-field v-model="search" type="text" label="گەڕان" dense class="mx-1" filled outlined>
                    </v-text-field>
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" v-model="selected_rows"    :search="search" :items="rows" class="elevation-0"
                    item-key="expense_id">
                    <!-- expense_date-->
                    <template v-slot:[`item.expense_date`]="{ item }">
                        <div>
                            {{ new Date(item.expense_date).toISOString().split('T')[0]}} {{ new Date(item.expense_date).toISOString().split('T')[1].split('.')[0]}}
                        </div>
                    </template>
                    <template v-slot:[`item.expense_id`]="{ item }">
                        <div>
                            <v-btn icon :to="'/expenses-list/'+item.expense_id"  color="teal" class="mx-1">
                            <v-icon> mdi-pencil-outline </v-icon>
                            </v-btn>
                            <v-btn color="error" icon class="mx-1" @click="selectExpenses(item)" >
                                <v-icon> mdi-delete-outline </v-icon>
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>
            
            <v-card-actions v-if="selected_rows.length > 0">
                <v-btn color="error" @click="deleteExpensesList">{{$store.getters.language.data.expenses.delete_list_btn}}</v-btn>
            </v-card-actions>
                
        </v-card>
    </v-flex>
</v-layout>
</v-container>
<v-dialog v-model="delete_dialog" persistent max-width="400">
    <v-card>
        <v-card-title>
            {{$store.getters.language.data.expenses.delete_question}}
        </v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text class="elevation-0" @click="delete_dialog = false">
                {{$store.getters.language.data.expenses.cancel_btn}}
            </v-btn>
            <v-btn color="error" class="elevation-0" @click="deleteExpenses(selected_expenses.expense_id)">
                {{$store.getters.language.data.expenses.yes_btn}}
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
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
                search: '',
                loading : true,
                loading_btn:false,
                selected_rows : [],
                snackbar: {
                    value: false,
                    text: '',
                    color: ''
                },
                rows:[],
                selected_expenses : {},
                delete_dialog: false,
                headers: [

                    
                        { 
                            text: this.$store.getters.language.data.expenses.expense_amount,
                            align: 'start',
                            sortable: true,
                            value: 'expense_amount',
                        },
                        { 
                            text: this.$store.getters.language.data.expenses.expense_note,
                            align: 'start',
                            sortable: true,
                            value: 'expense_note',
                        },
                        { 
                            text: this.$store.getters.language.data.expenses.expense_date,
                            align: 'start',
                            sortable: true,
                            value: 'expense_date',
                        },
                    {
                        text: this.$store.getters.language.data.users.user_name,
                        align: 'start',
                        sortable: true,
                        value: 'user_name',
                    },   {
            text: this.$store.getters.language.data.actions,
            align: 'start',
            sortable: true,
            value: 'expense_id',
        }
                ],
            }
        },
        computed: {
            users(){
                return this.$store.getters.users_list
            },
            user(){
                return this.$store.getters.user
            },
        },
        mounted(){
            this.readExpenses();
        },
        methods: {
            addExpenses() {
                this.loading_btn = true
                requests.createExpenses(this.expenses).then(r => {
                    if (r.status == 200) {
                        this.expenses = {
                            user_id: this.user.user_id,
                        }
                        this.rows.push(
                            r.data.new_data
                        )
                        this.snackbar = {
                            value: true,
                            text: 'Expenses Added',
                            color: 'success'
                        }
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to add Expenses',
                            color: 'error'
                        }
                    }
                })
                .finally(() => {
                    this.loading_btn = false
                })

            },
            deleteExpenses(expense_id) {
                requests.deleteExpenses(expense_id).then(r => {
                    this.delete_dialog = false
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{
                            return f.expense_id != expense_id
                        })
                        this.snackbar = {
                            value: true,
                            text: 'Expenses Deleted',
                            color: 'success'
                        }
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Delete Faild',
                            color: 'error'
                        }
                    }
                })
            },
            
            deleteExpensesList() {
                let ids = this.selected_rows.map(m => m.expense_id)
                requests.deleteExpensesList(ids).then(r => {
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{  
                            return ids.indexOf(f.expense_id) == -1
                        })
                        this.snackbar = {
                            value: true,
                            text: this.selected_rows.length+' Expenses Deleted',
                            color: 'success'
                        }
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Delete Faild',
                            color: 'error'
                        }
                    }
                })
            },
            
            readExpenses() {
                this.loading = true
                this.expenses.user_id = this.user.user_id
                requests.getAllExpenses().then(r => {
                    if (r.status == 200) {
                        this.rows = r.data.rows
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
            selectExpenses(i) {
                this.selected_expenses = i
                this.delete_dialog = true
            },
        },
    }
</script>
                    