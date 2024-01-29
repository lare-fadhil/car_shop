
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
            <v-container v-else class="my-2">
                <form @submit.prevent="addInvoices" autocomplete="off">
                    <v-layout row wrap>
        
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="invoices.invoice_name" type="text" :label="$store.getters.language.data.invoices.invoice_name" dense
                            class="mx-1"  filled outlined  required>
                        </v-text-field>
                    </v-flex>
                
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="invoices.invoice_price" type="text" :label="$store.getters.language.data.invoices.invoice_price" dense
                            class="mx-1"  filled outlined  required>
                        </v-text-field>
                    </v-flex>
                
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="invoices.invoice_discount" type="text" :label="$store.getters.language.data.invoices.invoice_discount" dense
                            class="mx-1"  filled outlined  required>
                        </v-text-field>
                    </v-flex>
                
                   <!-- <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="invoices.invoice_date" type="datetime-local" :label="$store.getters.language.data.invoices.invoice_date" dense
                            class="mx-1"  filled outlined >
                        </v-text-field>
                    </v-flex> -->
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="invoices.invoice_note" type="text" :label="$store.getters.language.data.invoices.invoice_note" dense
                            class="mx-1"  filled outlined >
                        </v-text-field>
                    </v-flex>
                        <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-select class="mx-1" clearable  :items="users" v-model="invoices.user_id" dense  filled outlined  item-text="user_id"
                                    item-value="user_id" :return-object="false" :label="$store.getters.language.data.users.user_id">
                                </v-select>
                        </v-flex>
                
                        <v-flex xs12 lg2 xl2 md2 sm4>
                            <v-btn  color="primary" :loading="loading_btn" type="submit" >{{$store.getters.language.data.invoices.add_btn}}</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
<v-layout row wrap mt-5>
    <v-flex xs12>
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers"  show-select v-model="selected_rows"    :search="search" :items="rows" class="elevation-0"
                    item-key="invoice_id">
                    <template v-slot:[`item.invoice_id`]="{ item }">
                        <div>
                            <v-btn icon :to="'/invoices-list/'+item.invoice_id"  color="teal" class="mx-1">
                            <v-icon> mdi-pencil-outline </v-icon>
                            </v-btn>
                            <v-btn color="error" icon class="mx-1" @click="selectInvoices(item)" >
                                <v-icon> mdi-delete-outline </v-icon>
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>
            
            <v-card-actions v-if="selected_rows.length > 0">
                <v-btn color="error" @click="deleteInvoicesList">{{$store.getters.language.data.invoices.delete_list_btn}}</v-btn>
            </v-card-actions>
                
        </v-card>
    </v-flex>
</v-layout>
</v-container>
<v-dialog v-model="delete_dialog" persistent max-width="400">
    <v-card>
        <v-card-title>
            {{$store.getters.language.data.invoices.delete_question}}
        </v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text class="elevation-0" @click="delete_dialog = false">
                {{$store.getters.language.data.invoices.cancel_btn}}
            </v-btn>
            <v-btn color="error" class="elevation-0" @click="deleteInvoices(selected_invoices.invoice_id)">
                {{$store.getters.language.data.invoices.yes_btn}}
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
    import requests from '../../requests/invoices.request.js'
    export default {
        data() {
            return {
                invoices: {},
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
                selected_invoices : {},
                delete_dialog: false,
                headers: [

                    
                        { 
                            text: this.$store.getters.language.data.invoices.invoice_name,
                            align: 'start',
                            sortable: true,
                            value: 'invoice_name',
                        },
                        { 
                            text: this.$store.getters.language.data.invoices.invoice_price,
                            align: 'start',
                            sortable: true,
                            value: 'invoice_price',
                        },
                        { 
                            text: this.$store.getters.language.data.invoices.invoice_discount,
                            align: 'start',
                            sortable: true,
                            value: 'invoice_discount',
                        },
                        { 
                            text: this.$store.getters.language.data.invoices.invoice_date,
                            align: 'start',
                            sortable: true,
                            value: 'invoice_date',
                        },
                        { 
                            text: this.$store.getters.language.data.invoices.invoice_note,
                            align: 'start',
                            sortable: true,
                            value: 'invoice_note',
                        },
                    {
                        text: this.$store.getters.language.data.users.user_id,
                        align: 'start',
                        sortable: true,
                        value: 'user_id',
                    },   {
            text: this.$store.getters.language.data.actions,
            align: 'start',
            sortable: true,
            value: 'invoice_id',
        }
                ],
            }
        },
        computed: {
            users(){
                return this.$store.getters.users_list
            },
        },
        mounted(){
            this.readInvoices();
        },
        methods: {
            addInvoices() {
                this.loading_btn = true
                requests.createInvoices(this.invoices).then(r => {
                    if (r.status == 200) {
                        this.invoices = {}
                        this.rows.push(
                            r.data.new_data
                        )
                        this.snackbar = {
                            value: true,
                            text: 'Invoices Added',
                            color: 'success'
                        }
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to add Invoices',
                            color: 'error'
                        }
                    }
                })
                .finally(() => {
                    this.loading_btn = false
                })

            },
            deleteInvoices(invoice_id) {
                requests.deleteInvoices(invoice_id).then(r => {
                    this.delete_dialog = false
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{
                            return f.invoice_id != invoice_id
                        })
                        this.snackbar = {
                            value: true,
                            text: 'Invoices Deleted',
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
            
            deleteInvoicesList() {
                let ids = this.selected_rows.map(m => m.invoice_id)
                requests.deleteInvoicesList(ids).then(r => {
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{  
                            return ids.indexOf(f.invoice_id) == -1
                        })
                        this.snackbar = {
                            value: true,
                            text: this.selected_rows.length+' Invoices Deleted',
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
            
            readInvoices() {
                this.loading = true
                requests.getAllInvoices().then(r => {
                    if (r.status == 200) {
                        this.rows = r.data.rows
                        this.loading = false
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to read Invoices',
                            color: 'error'
                        }
                    }
                })
                .catch(e => {
                    this.snackbar = {
                        value: true,
                        text: 'Fail to read Invoices',
                        color: 'error'
                    }
                })
                .finally(() => {
                    this.loading = false
                })
            },
            selectInvoices(i) {
                this.selected_invoices = i
                this.delete_dialog = true
            },
        },
    }
</script>
                    