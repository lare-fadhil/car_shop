
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
        <v-container v-else class="my-2">
            <form @submit.prevent="updateInvoiceItems" autocomplete="off">
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
                        <v-text-field v-model="invoice_items.invoice_item_price" type="text" :label="$store.getters.language.data.invoice_items.invoice_item_price" 
                            class="mx-1"  filled outlined dense required >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="invoice_items.invoice_item_qty" type="number" :label="$store.getters.language.data.invoice_items.invoice_item_qty" 
                            class="mx-1"  filled outlined dense required >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md2 sm4>
                        <v-btn  color="success"    type="submit">{{$store.getters.language.data.invoice_items.update_btn}}</v-btn>
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
    import requests from './../../requests/invoice_items.request.js'
    export default {
        data() {
            return {
                invoice_items: {},
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
            
                    invoices(){
                        return this.$store.getters.invoices_list
                    },
                    
                    items(){
                        return this.$store.getters.items_list
                    },
                    
        },
        mounted(){
            this.id = this.$route.params.id
            this.getOneInvoiceItems()
        },
        methods: {
            getOneInvoiceItems() {
                this.loading = true
                requests.getOneInvoiceItems(this.id).then(r =>{
                    if (r.status == 200) {
                        this.invoice_items = r.data.row
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
            updateInvoiceItems() {
                this.loading = true
                requests.updateInvoiceItems(this.id,this.invoice_items).then(r => {
                    if (r.status == 200) {
                        this.snackbar = {
                            value: true,
                            text: 'InvoiceItems Updated',
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
                    