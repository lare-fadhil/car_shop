
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
        <v-container v-else class="my-2">
            <form @submit.prevent="updateCarItems" autocomplete="off">
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
                        <v-btn  color="success"    type="submit">{{$store.getters.language.data.car_items.update_btn}}</v-btn>
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
    import requests from './../../requests/car_items.request.js'
    export default {
        data() {
            return {
                car_items: {},
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
            
                    cars(){
                        return this.$store.getters.cars_list
                    },
                    
                    items(){
                        return this.$store.getters.items_list
                    },
                    
        },
        mounted(){
            this.id = this.$route.params.id
            this.getOneCarItems()
        },
        methods: {
            getOneCarItems() {
                this.loading = true
                requests.getOneCarItems(this.id).then(r =>{
                    if (r.status == 200) {
                        this.car_items = r.data.row
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
            updateCarItems() {
                this.loading = true
                requests.updateCarItems(this.id,this.car_items).then(r => {
                    if (r.status == 200) {
                        this.snackbar = {
                            value: true,
                            text: 'CarItems Updated',
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
                    