
<template>
	<div>
		<v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
		<v-container v-else class="my-2">

			<h1 class="mt-4 mb-7">زیادکردنی کاڵا : </h1>

			<form @submit.prevent="addItems" autocomplete="off">
				<v-layout row wrap>

					<v-flex xs12 lg4 xl4 md3 sm4>

						<v-text-field v-model="items.item_name" type="text" :label="$store.getters.language.data.items.item_name" dense class="mx-1" filled outlined required>
						</v-text-field>
					</v-flex>

					<v-flex xs12 lg4 xl4 md3 sm4>

						<v-text-field v-model="items.item_barcode" type="text" :label="$store.getters.language.data.items.item_barcode" dense class="mx-1" filled outlined required>
						</v-text-field>
					</v-flex>

					<v-flex xs12 lg4 xl4 md3 sm4>

						<v-text-field v-model="items.item_price" type="text" :label="$store.getters.language.data.items.item_price" dense class="mx-1" filled outlined required>
						</v-text-field>
					</v-flex>

					<v-flex xs12 lg4 xl4 md3 sm4>

						<v-text-field v-model="items.item_qty" type="number" :label="$store.getters.language.data.items.item_qty" dense class="mx-1" filled outlined required>
						</v-text-field>
					</v-flex>

					<v-flex xs12 lg4 xl4 md3 sm4>

						<v-text-field v-model="items.item_note" type="text" :label="$store.getters.language.data.items.item_note" dense class="mx-1" filled outlined>
						</v-text-field>
					</v-flex>
					<v-flex xs12 lg4 xl4 md3 sm4>

						<v-select class="mx-1" clearable :items="users" v-model="items.user_id" dense filled outlined item-text="user_name" item-value="user_id" :return-object="false" :label="$store.getters.language.data.users.user_name" disabled>
						</v-select>
					</v-flex>

					<v-flex xs12 lg2 xl2 md2 sm4>
						<v-btn color="primary" :loading="loading_btn" type="submit">{{$store.getters.language.data.items.add_btn}}</v-btn>
					</v-flex>
				</v-layout>
			</form>
			<v-layout row wrap mt-5>
				<v-flex xs12>
					<v-text-field v-model="search" type="text" label="گەڕان" dense class="mx-1" filled outlined>
					</v-text-field>
					<v-card>
						<v-card-text>
							<v-data-table :headers="headers" v-model="selected_rows" :search="search" :items="rows" class="elevation-0" item-key="item_id">
								<template v-slot:[`item.item_id`]="{ item }">
									<div>
										<v-btn icon :to="'/items-list/'+item.item_id" color="teal" class="mx-1">
											<v-icon> mdi-pencil-outline </v-icon>
										</v-btn>
										<v-btn color="error" icon class="mx-1" @click="selectItems(item)">
											<v-icon> mdi-delete-outline </v-icon>
										</v-btn>
									</div>
								</template>
							</v-data-table>
						</v-card-text>

						<v-card-actions v-if="selected_rows.length > 0">
							<v-btn color="error" @click="deleteItemsList">{{$store.getters.language.data.items.delete_list_btn}}</v-btn>
						</v-card-actions>

					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-dialog v-model="delete_dialog" persistent max-width="400">
			<v-card>
				<v-card-title>
					{{$store.getters.language.data.items.delete_question}}
				</v-card-title>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text class="elevation-0" @click="delete_dialog = false">
						{{$store.getters.language.data.items.cancel_btn}}
					</v-btn>
					<v-btn color="error" class="elevation-0" @click="deleteItems(selected_items.item_id)">
						{{$store.getters.language.data.items.yes_btn}}
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
	import requests from './../../requests/items.request.js'
	export default {
		data() {
			return {
				items: {
                    user_id: 0,
                },
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
				selected_items: {},
				delete_dialog: false,
				headers: [


					{
						text: this.$store.getters.language.data.items.item_name,
						align: 'start',
						sortable: true,
						value: 'item_name',
					},
					{
						text: this.$store.getters.language.data.items.item_barcode,
						align: 'start',
						sortable: true,
						value: 'item_barcode',
					},
					{
						text: this.$store.getters.language.data.items.item_price,
						align: 'start',
						sortable: true,
						value: 'item_price',
					},
					{
						text: this.$store.getters.language.data.items.item_qty,
						align: 'start',
						sortable: true,
						value: 'item_qty',
					},
					{
						text: this.$store.getters.language.data.items.item_note,
						align: 'start',
						sortable: true,
						value: 'item_note',
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
						value: 'item_id',
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
            this.items.user_id = this.user.user_id
			this.readItems();
		},
		methods: {
			addItems() {
				this.loading_btn = true
				requests.createItems(this.items).then(r => {
					if (r.status == 200) {
						this.items = {
							user_id: this.user.user_id,
						}
						this.rows.push(
							r.data.new_data
						)
						this.snackbar = {
							value: true,
							text: 'Items Added',
							color: 'success'
						}
					} else {
						this.snackbar = {
							value: true,
							text: 'Fail to add Items',
							color: 'error'
						}
					}
				})
					.finally(() => {
						this.loading_btn = false
					})

			},
			deleteItems(item_id) {
				requests.deleteItems(item_id).then(r => {
					this.delete_dialog = false
					if (r.status == 200) {
						this.rows = this.rows.filter(f => {
							return f.item_id != item_id
						})
						this.snackbar = {
							value: true,
							text: 'Items Deleted',
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

			deleteItemsList() {
				let ids = this.selected_rows.map(m => m.item_id)
				requests.deleteItemsList(ids).then(r => {
					if (r.status == 200) {
						this.rows = this.rows.filter(f => {
							return ids.indexOf(f.item_id) == -1
						})
						this.snackbar = {
							value: true,
							text: this.selected_rows.length + ' Items Deleted',
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

			readItems() {
				this.loading = true



				requests.getAllItems().then(r => {
                    if (r.status == 200) {
                        this.items.user_id = this.user.user_id
						this.rows = r.data.rows
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
			selectItems(i) {
				this.selected_items = i
				this.delete_dialog = true
			},
		},
	}
</script>
                    