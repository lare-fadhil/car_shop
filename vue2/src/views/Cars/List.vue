
<template>
	<div>
		<v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
		<v-container v-else class="my-2">
			<form @submit.prevent="addCars" autocomplete="off">
				<v-layout row wrap>

					<v-flex xs12 lg2 xl2 md3 sm4>
						<v-text-field v-model="cars.car_name" type="text" :label="$store.getters.language.data.cars.car_name" dense class="mx-1" filled outlined required>
						</v-text-field>
					</v-flex>

					<v-flex xs12 lg2 xl2 md3 sm4>
						<v-text-field v-model="cars.car_model" type="text" :label="$store.getters.language.data.cars.car_model" dense class="mx-1" filled outlined>
						</v-text-field>
					</v-flex>
					<v-flex xs12 lg2 xl2 md3 sm4>
						<v-text-field v-model="cars.car_year" type="text" :label="$store.getters.language.data.cars.car_year" dense class="mx-1" filled outlined>
						</v-text-field>
					</v-flex>
					<v-flex xs12 lg2 xl2 md3 sm4>
						<v-text-field v-model="cars.car_note" type="text" :label="$store.getters.language.data.cars.car_note" dense class="mx-1" filled outlined>
						</v-text-field>
					</v-flex>
					<v-flex xs12 lg2 xl2 md3 sm4>
						<v-select class="mx-1" clearable :items="users" v-model="cars.user_id" dense filled outlined item-text="user_name" item-value="user_id" :return-object="false" :label="$store.getters.language.data.users.user_name" disabled>
						</v-select>
					</v-flex>

					<v-flex xs12 lg2 xl2 md2 sm4>
						<v-btn color="primary" :loading="loading_btn" type="submit">{{$store.getters.language.data.cars.add_btn}}</v-btn>
					</v-flex>
				</v-layout>
			</form>
			<v-layout row wrap mt-5>
				<v-flex xs12>
                    <v-text-field v-model="search" type="text" label="گەڕان" dense class="mx-1" filled outlined>
                    </v-text-field>
					<v-card>
						<v-card-text>
							<v-data-table :headers="headers" v-model="selected_rows" :search="search" :items="rows" class="elevation-0" item-key="car_id">
								<template v-slot:[`item.car_id`]="{ item }">
									<div>
										<v-btn icon :to="'/cars-list/'+item.car_id" color="teal" class="mx-1">
											<v-icon> mdi-pencil-outline </v-icon>
										</v-btn>
										<v-btn icon :to="'/cars-info/'+item.car_id" color="primary" class="mx-1">
											<v-icon> mdi-pencil-outline </v-icon>
										</v-btn>
										<v-btn color="error" icon class="mx-1" @click="selectCars(item)">
											<v-icon> mdi-delete-outline </v-icon>
										</v-btn>
									</div>
								</template>
							</v-data-table>
						</v-card-text>

						<v-card-actions v-if="selected_rows.length > 0">
							<v-btn color="error" @click="deleteCarsList">{{$store.getters.language.data.cars.delete_list_btn}}</v-btn>
						</v-card-actions>

					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-dialog v-model="delete_dialog" persistent max-width="400">
			<v-card>
				<v-card-title>
					{{$store.getters.language.data.cars.delete_question}}
				</v-card-title>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text class="elevation-0" @click="delete_dialog = false">
						{{$store.getters.language.data.cars.cancel_btn}}
					</v-btn>
					<v-btn color="error" class="elevation-0" @click="deleteCars(selected_cars.car_id)">
						{{$store.getters.language.data.cars.yes_btn}}
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
	import requests from './../../requests/cars.request.js'
	export default {
		data() {
			return {
				cars: {},
				search: '',
				loading: true,
				loading_btn: false,
				selected_rows: [],
				snackbar: {
					value: false,
					text: '',
					color: ''
				},
				rows: [],
				selected_cars: {},
				delete_dialog: false,
				headers: [


					{
						text: this.$store.getters.language.data.cars.car_name,
						align: 'start',
						sortable: true,
						value: 'car_name',
					},
					{
						text: this.$store.getters.language.data.cars.car_model,
						align: 'start',
						sortable: true,
						value: 'car_model',
					},
					{
						text: this.$store.getters.language.data.cars.car_year,
						align: 'start',
						sortable: true,
						value: 'car_year',
					},
					{
						text: this.$store.getters.language.data.cars.car_note,
						align: 'start',
						sortable: true,
						value: 'car_note',
					},
					{
						text: this.$store.getters.language.data.users.user_id,
						align: 'start',
						sortable: true,
						value: 'user_id',
					}, {
						text: this.$store.getters.language.data.actions,
						align: 'start',
						sortable: true,
						value: 'car_id',
					}
				],
			}
		},
		computed: {
			users() {
				return this.$store.getters.users_list
			},
			user() {
				return this.$store.getters.user
			}
		},
		mounted() {
           
           
			this.readCars();
           
           
		},
		methods: {
			addCars() {
				this.loading_btn = true
				requests.createCars(this.cars).then(r => {
					if (r.status == 200) {
						this.cars = {
                            user_id : this.user.user_id
                        }
						this.rows.push(
							r.data.new_data
						)
						this.snackbar = {
							value: true,
							text: 'Cars Added',
							color: 'success'
						}
					} else {
						this.snackbar = {
							value: true,
							text: 'Fail to add Cars',
							color: 'error'
						}
					}
				})
					.finally(() => {
						this.loading_btn = false
					})

			},
			deleteCars(car_id) {
				requests.deleteCars(car_id).then(r => {
					this.delete_dialog = false
					if (r.status == 200) {
						this.rows = this.rows.filter(f => {
							return f.car_id != car_id
						})
						this.snackbar = {
							value: true,
							text: 'Cars Deleted',
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

			deleteCarsList() {
				let ids = this.selected_rows.map(m => m.car_id)
				requests.deleteCarsList(ids).then(r => {
					if (r.status == 200) {
						this.rows = this.rows.filter(f => {
							return ids.indexOf(f.car_id) == -1
						})
						this.snackbar = {
							value: true,
							text: this.selected_rows.length + ' Cars Deleted',
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

			readCars() {
				this.loading = true
                this.cars.user_id = this.user.user_id
				requests.getAllCars().then(r => {
					if (r.status == 200) {
						this.rows = r.data.rows
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
			selectCars(i) {
				this.selected_cars = i
				this.delete_dialog = true
			},
		},
	}
</script>
                    