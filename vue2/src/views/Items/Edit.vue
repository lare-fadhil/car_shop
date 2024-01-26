
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
        <v-container v-else class="my-2">
            <form @submit.prevent="updateItems" autocomplete="off">
                <v-layout row wrap>
        
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="items.item_name" type="text" :label="$store.getters.language.data.items.item_name" 
                            class="mx-1"  filled outlined dense required >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="items.item_barcode" type="text" :label="$store.getters.language.data.items.item_barcode" 
                            class="mx-1"  filled outlined dense required >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="items.item_price" type="text" :label="$store.getters.language.data.items.item_price" 
                            class="mx-1"  filled outlined dense required >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="items.item_qty" type="number" :label="$store.getters.language.data.items.item_qty" 
                            class="mx-1"  filled outlined dense required >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="items.item_note" type="text" :label="$store.getters.language.data.items.item_note" 
                            class="mx-1"  filled outlined dense  >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-select class="mx-1" clearable  :items="users" v-model="items.user_id" dense  filled outlined  item-text="user_id"
                                    item-value="user_id" :return-object="false" :label="$store.getters.language.data.users.user_id">
                        </v-select>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md2 sm4>
                        <v-btn  color="success"    type="submit">{{$store.getters.language.data.items.update_btn}}</v-btn>
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
    import requests from './../../requests/items.request.js'
    export default {
        data() {
            return {
                items: {},
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
            this.getOneItems()
        },
        methods: {
            getOneItems() {
                this.loading = true
                requests.getOneItems(this.id).then(r =>{
                    if (r.status == 200) {
                        this.items = r.data.row
                        this.loading = false
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to read Items',
                            color: 'error'
                        }
                    }
                })
                .catch(e => {
                    this.snackbar = {
                        value: true,
                        text: 'Fail to read Items',
                        color: 'error'
                    }
                })
                .finally(() => {
                    this.loading = false
                })
            },
            updateItems() {
                this.loading = true
                requests.updateItems(this.id,this.items).then(r => {
                    if (r.status == 200) {
                        this.snackbar = {
                            value: true,
                            text: 'Items Updated',
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
                    