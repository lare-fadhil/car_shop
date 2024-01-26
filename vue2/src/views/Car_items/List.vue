
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
            <v-container v-else class="my-2">
                <form @submit.prevent="addCarItems" autocomplete="off">
                    <v-layout row wrap>
        
                        <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-select class="mx-1" clearable  :items="cars" v-model="car_items.car_id" dense  filled outlined  item-text="car_id"
                                    item-value="car_id" :return-object="false" :label="$store.getters.language.data.cars.car_id">
                                </v-select>
                        </v-flex>
                
                        <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-select class="mx-1" clearable  :items="items" v-model="car_items.item_id" dense  filled outlined  item-text="item_id"
                                    item-value="item_id" :return-object="false" :label="$store.getters.language.data.items.item_id">
                                </v-select>
                        </v-flex>
                
                        <v-flex xs12 lg2 xl2 md2 sm4>
                            <v-btn  color="primary" :loading="loading_btn" type="submit" >{{$store.getters.language.data.car_items.add_btn}}</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
<v-layout row wrap mt-5>
    <v-flex xs12>
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers"  show-select v-model="selected_rows"    :search="search" :items="rows" class="elevation-0"
                    item-key="car_item_id">
                    <template v-slot:[`item.car_item_id`]="{ item }">
                        <div>
                            <v-btn icon :to="'/car_items-list/'+item.car_item_id"  color="teal" class="mx-1">
                            <v-icon> mdi-pencil-outline </v-icon>
                            </v-btn>
                            <v-btn color="error" icon class="mx-1" @click="selectCarItems(item)" >
                                <v-icon> mdi-delete-outline </v-icon>
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>
            
            <v-card-actions v-if="selected_rows.length > 0">
                <v-btn color="error" @click="deleteCarItemsList">{{$store.getters.language.data.car_items.delete_list_btn}}</v-btn>
            </v-card-actions>
                
        </v-card>
    </v-flex>
</v-layout>
</v-container>
<v-dialog v-model="delete_dialog" persistent max-width="400">
    <v-card>
        <v-card-title>
            {{$store.getters.language.data.car_items.delete_question}}
        </v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text class="elevation-0" @click="delete_dialog = false">
                {{$store.getters.language.data.car_items.cancel_btn}}
            </v-btn>
            <v-btn color="error" class="elevation-0" @click="deleteCarItems(selected_car_items.car_item_id)">
                {{$store.getters.language.data.car_items.yes_btn}}
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
    import requests from './../../requests/car_items.request.js'
    export default {
        data() {
            return {
                car_items: {},
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
                selected_car_items : {},
                delete_dialog: false,
                headers: [

                    
                    {
                        text: this.$store.getters.language.data.cars.car_id,
                        align: 'start',
                        sortable: true,
                        value: 'car_id',
                    },
                    {
                        text: this.$store.getters.language.data.items.item_id,
                        align: 'start',
                        sortable: true,
                        value: 'item_id',
                    },   {
            text: this.$store.getters.language.data.actions,
            align: 'start',
            sortable: true,
            value: 'car_item_id',
        }
                ],
            }
        },
        computed: {
            cars(){
                return this.$store.getters.cars_list
            },
            items(){
                return this.$store.getters.items_list
            },
        },
        mounted(){
            this.readCarItems();
        },
        methods: {
            addCarItems() {
                this.loading_btn = true
                requests.createCarItems(this.car_items).then(r => {
                    if (r.status == 200) {
                        this.car_items = {}
                        this.rows.push(
                            r.data.new_data
                        )
                        this.snackbar = {
                            value: true,
                            text: 'CarItems Added',
                            color: 'success'
                        }
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to add CarItems',
                            color: 'error'
                        }
                    }
                })
                .finally(() => {
                    this.loading_btn = false
                })

            },
            deleteCarItems(car_item_id) {
                requests.deleteCarItems(car_item_id).then(r => {
                    this.delete_dialog = false
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{
                            return f.car_item_id != car_item_id
                        })
                        this.snackbar = {
                            value: true,
                            text: 'CarItems Deleted',
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
            
            deleteCarItemsList() {
                let ids = this.selected_rows.map(m => m.car_item_id)
                requests.deleteCarItemsList(ids).then(r => {
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{  
                            return ids.indexOf(f.car_item_id) == -1
                        })
                        this.snackbar = {
                            value: true,
                            text: this.selected_rows.length+' CarItems Deleted',
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
            
            readCarItems() {
                this.loading = true
                requests.getAllCarItems().then(r => {
                    if (r.status == 200) {
                        this.rows = r.data.rows
                        this.loading = false
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to read CarItems',
                            color: 'error'
                        }
                    }
                })
                .catch(e => {
                    this.snackbar = {
                        value: true,
                        text: 'Fail to read CarItems',
                        color: 'error'
                    }
                })
                .finally(() => {
                    this.loading = false
                })
            },
            selectCarItems(i) {
                this.selected_car_items = i
                this.delete_dialog = true
            },
        },
    }
</script>
                    