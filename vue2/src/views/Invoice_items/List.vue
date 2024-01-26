
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
            <v-container v-else class="my-2">
                <form @submit.prevent="addInvoiceItems" autocomplete="off">
                    <v-layout row wrap>
        
                        <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-select class="mx-1" clearable  :items="invoices" v-model="invoice_items.invoice_id" dense  filled outlined  item-text="invoice_id"
                                    item-value="invoice_id" :return-object="false" :label="$store.getters.language.data.invoices.invoice_id">
                                </v-select>
                        </v-flex>
                
                        <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-select class="mx-1" clearable  :items="items" v-model="invoice_items.item_id" dense  filled outlined  item-text="item_id"
                                    item-value="item_id" :return-object="false" :label="$store.getters.language.data.items.item_id">
                                </v-select>
                        </v-flex>
                
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="invoice_items.invoice_item_price" type="text" :label="$store.getters.language.data.invoice_items.invoice_item_price" dense
                            class="mx-1"  filled outlined  required>
                        </v-text-field>
                    </v-flex>
                
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="invoice_items.invoice_item_qty" type="number" :label="$store.getters.language.data.invoice_items.invoice_item_qty" dense
                            class="mx-1"  filled outlined  required>
                        </v-text-field>
                    </v-flex>
                
                        <v-flex xs12 lg2 xl2 md2 sm4>
                            <v-btn  color="primary" :loading="loading_btn" type="submit" >{{$store.getters.language.data.invoice_items.add_btn}}</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
<v-layout row wrap mt-5>
    <v-flex xs12>
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers"  show-select v-model="selected_rows"    :search="search" :items="rows" class="elevation-0"
                    item-key="invoice_item_id">
                    <template v-slot:[`item.invoice_item_id`]="{ item }">
                        <div>
                            <v-btn icon :to="'/invoice_items-list/'+item.invoice_item_id"  color="teal" class="mx-1">
                            <v-icon> mdi-pencil-outline </v-icon>
                            </v-btn>
                            <v-btn color="error" icon class="mx-1" @click="selectInvoiceItems(item)" >
                                <v-icon> mdi-delete-outline </v-icon>
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>
            
            <v-card-actions v-if="selected_rows.length > 0">
                <v-btn color="error" @click="deleteInvoiceItemsList">{{$store.getters.language.data.invoice_items.delete_list_btn}}</v-btn>
            </v-card-actions>
                
        </v-card>
    </v-flex>
</v-layout>
</v-container>
<v-dialog v-model="delete_dialog" persistent max-width="400">
    <v-card>
        <v-card-title>
            {{$store.getters.language.data.invoice_items.delete_question}}
        </v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text class="elevation-0" @click="delete_dialog = false">
                {{$store.getters.language.data.invoice_items.cancel_btn}}
            </v-btn>
            <v-btn color="error" class="elevation-0" @click="deleteInvoiceItems(selected_invoice_items.invoice_item_id)">
                {{$store.getters.language.data.invoice_items.yes_btn}}
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
    import requests from './../../requests/invoice_items.request.js'
    export default {
        data() {
            return {
                invoice_items: {},
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
                selected_invoice_items : {},
                delete_dialog: false,
                headers: [

                    
                    {
                        text: this.$store.getters.language.data.invoices.invoice_id,
                        align: 'start',
                        sortable: true,
                        value: 'invoice_id',
                    },
                    {
                        text: this.$store.getters.language.data.items.item_id,
                        align: 'start',
                        sortable: true,
                        value: 'item_id',
                    },
                        { 
                            text: this.$store.getters.language.data.invoice_items.invoice_item_price,
                            align: 'start',
                            sortable: true,
                            value: 'invoice_item_price',
                        },
                        { 
                            text: this.$store.getters.language.data.invoice_items.invoice_item_qty,
                            align: 'start',
                            sortable: true,
                            value: 'invoice_item_qty',
                        },   {
            text: this.$store.getters.language.data.actions,
            align: 'start',
            sortable: true,
            value: 'invoice_item_id',
        }
                ],
            }
        },
        computed: {
            invoices(){
                return this.$store.getters.invoices_list
            },
            items(){
                return this.$store.getters.items_list
            },
        },
        mounted(){
            this.readInvoiceItems();
        },
        methods: {
            addInvoiceItems() {
                this.loading_btn = true
                requests.createInvoiceItems(this.invoice_items).then(r => {
                    if (r.status == 200) {
                        this.invoice_items = {}
                        this.rows.push(
                            r.data.new_data
                        )
                        this.snackbar = {
                            value: true,
                            text: 'InvoiceItems Added',
                            color: 'success'
                        }
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to add InvoiceItems',
                            color: 'error'
                        }
                    }
                })
                .finally(() => {
                    this.loading_btn = false
                })

            },
            deleteInvoiceItems(invoice_item_id) {
                requests.deleteInvoiceItems(invoice_item_id).then(r => {
                    this.delete_dialog = false
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{
                            return f.invoice_item_id != invoice_item_id
                        })
                        this.snackbar = {
                            value: true,
                            text: 'InvoiceItems Deleted',
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
            
            deleteInvoiceItemsList() {
                let ids = this.selected_rows.map(m => m.invoice_item_id)
                requests.deleteInvoiceItemsList(ids).then(r => {
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{  
                            return ids.indexOf(f.invoice_item_id) == -1
                        })
                        this.snackbar = {
                            value: true,
                            text: this.selected_rows.length+' InvoiceItems Deleted',
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
            
            readInvoiceItems() {
                this.loading = true
                requests.getAllInvoiceItems().then(r => {
                    if (r.status == 200) {
                        this.rows = r.data.rows
                        this.loading = false
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to read InvoiceItems',
                            color: 'error'
                        }
                    }
                })
                .catch(e => {
                    this.snackbar = {
                        value: true,
                        text: 'Fail to read InvoiceItems',
                        color: 'error'
                    }
                })
                .finally(() => {
                    this.loading = false
                })
            },
            selectInvoiceItems(i) {
                this.selected_invoice_items = i
                this.delete_dialog = true
            },
        },
    }
</script>
                    