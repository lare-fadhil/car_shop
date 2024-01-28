
<template>
	<div>
		<v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
		<v-container v-else class="my-2">
                    <h1 class="mt-4 mb-7">زانیاری ئۆتۆمبێل: </h1>

			<form @submit.prevent="updateCars" autocomplete="off">
				<v-layout row wrap>

					<v-flex xs12 lg2 xl2 md3 sm4>
						<v-text-field v-model="cars.car_name" type="text" :label="$store.getters.language.data.cars.car_name" class="mx-1" filled outlined dense required disabled>
						</v-text-field>
					</v-flex>
					<v-flex xs12 lg2 xl2 md3 sm4>
						<v-text-field v-model="cars.car_model" type="text" :label="$store.getters.language.data.cars.car_model" class="mx-1" filled outlined dense disabled>
						</v-text-field>
					</v-flex>
					<v-flex xs12 lg2 xl2 md3 sm4>
						<v-text-field v-model="cars.car_year" type="text" :label="$store.getters.language.data.cars.car_year" class="mx-1" filled outlined dense disabled>
						</v-text-field>
					</v-flex>
					<v-flex xs12 lg2 xl2 md3 sm4>
						<v-text-field v-model="cars.car_note" type="text" :label="$store.getters.language.data.cars.car_note" class="mx-1" filled outlined dense disabled>
						</v-text-field>
					</v-flex>
					<v-flex xs12 lg2 xl2 md3 sm4>
						<v-select class="mx-1" clearable :items="users" v-model="cars.user_id" dense disabled filled outlined item-text="user_name" item-value="user_id" :return-object="false" :label="$store.getters.language.data.users.user_name">
						</v-select>
					</v-flex>
					<!-- <v-flex xs12 lg2 xl2 md2 sm4>
						<v-btn color="success" type="submit">{{$store.getters.language.data.cars.update_btn}}</v-btn>
					</v-flex> -->
				</v-layout>
			</form>
        <h1 class="mt-4 mb-7">زیادکردنی کاڵا بۆ ئۆتۆمبێلەکە:</h1>
                <form @submit.prevent="addCarItems" autocomplete="off">
                    <v-layout row wrap>
        
                        <!-- <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-select class="mx-1" clearable  :items="cars" v-model="car_items.car_id" dense  filled outlined  item-text="car_id"
                                    item-value="car_id" :return-object="false" :label="$store.getters.language.data.cars.car_id">
                                </v-select>
                        </v-flex> -->
                
                        <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-select class="mx-1" clearable  :items="items" v-model="car_items.item_id" dense  filled outlined  item-text="item_name"
                                    item-value="item_id" :return-object="false" :label="$store.getters.language.data.items.item_name">
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
                <v-data-table :headers="headers"  :items="rows" class="elevation-0"
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
            
            <!-- <v-card-actions v-if="selected_rows.length > 0">
                <v-btn color="error" @click="deleteCarItemsList">{{$store.getters.language.data.car_items.delete_list_btn}}</v-btn>
            </v-card-actions> -->
                
        </v-card>
    </v-flex>
</v-layout>
		</v-container>
		<v-snackbar v-model="snackbar.value" :color="snackbar.color">
			{{snackbar.text}}
		</v-snackbar>
	</div>
</template>
<script>
	import requests from '../../requests/cars.request.js'
	import caritemsrequests from './../../requests/car_items.request.js'

	export default {
		data() {
			return {
				cars: {},
                rows: [],
                car_items: {
                },
				id: '',
				loading: true,
                				loading_btn: false,

				snackbar: {
					value: false,
					text: '',
					color: ''
				},
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

			users() {
				return this.$store.getters.users_list
			},
            items(){
                return this.$store.getters.items_list
            },

		},
		mounted() {
			this.id = this.$route.params.id
			this.getOneCars()
            this.readCarItems()
		},
		methods: {
            addCarItems() {
                this.loading_btn = true
                caritemsrequests.createCarItems(this.car_items).then(r => {
                    if (r.status == 200) {
                        this.car_items = {
                            car_id : this.cars.car_id
                        }
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
			getOneCars() {
				this.loading = true
				requests.getOneCars(this.id).then(r => {
                    if (r.status == 200) {
                        this.cars = r.data.row
                        this.car_items.car_id =  this.cars.car_id
						this.loading = false
					} else {
						this.snackbar = {
							value: true,
							text: 'Fail to read Cars',
							color: 'error'
						}
					}
				})
					.catch(e => {
						this.snackbar = {
							value: true,
							text: 'Fail to read Cars',
							color: 'error'
						}
					})
					.finally(() => {
						this.loading = false
					})
			},
			readCarItems() {
				this.loading = true

				caritemsrequests.getCarItemsByColumn('car_id', this.id).then(r => {
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
			updateCars() {
				this.loading = true
				requests.updateCars(this.id, this.cars).then(r => {
					if (r.status == 200) {
						this.snackbar = {
							value: true,
							text: 'Cars Updated',
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
                    