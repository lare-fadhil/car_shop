
<template>
	<div>
		<v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
		<v-container v-else class="my-2">
	
			<v-layout row wrap mt-5>
                <h1 class="mb-6">لیستی فڕۆشتنەکان</h1>
				<v-flex xs12>
					<v-card>
                        <v-text-field v-model="search" type="text" label="گەڕان" dense class="mx-1" filled outlined>
                        </v-text-field>
						<v-card-text>
							<v-data-table :headers="headers"  v-model="selected_rows" :search="search" :items="rows" class="elevation-0" item-key="invoice_id">
								<template v-slot:[`item.invoice_id`]="{ item }">
									<div>
										<v-btn icon :to="'/invoices-list/'+item.invoice_id" color="teal" class="mx-1">
											<v-icon> mdi-pencil-outline </v-icon>
										</v-btn>
										<!-- <v-btn color="error" icon class="mx-1" @click="selectInvoices(item)">
											<v-icon> mdi-delete-outline </v-icon>
										</v-btn> -->
									</div>
								</template>
                                <template v-slot:[`item.invoice_date`]="{ item }">
                                    <!-- show date and time -->
                                    {{new Date(item.invoice_date).toLocaleString()}}
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
				loading: true,
				loading_btn: false,
				selected_rows: [],
				snackbar: {
					value: false,
					text: '',
					color: ''
				},
				rows: [],
				selected_invoices: {},
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
						text: 'نرخی کۆتایی',
						align: 'start',
						sortable: true,
						value: 'final_price',
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
						text: this.$store.getters.language.data.users.user_name,
						align: 'start',
						sortable: true,
						value: 'user_name',
					}, {
						text: this.$store.getters.language.data.actions,
						align: 'start',
						sortable: true,
						value: 'invoice_id',
					}
				],
			}
		},
		computed: {
			users() {
				return this.$store.getters.users_list
			},
		},
		mounted() {
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
						this.rows = this.rows.filter(f => {
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
						this.rows = this.rows.filter(f => {
							return ids.indexOf(f.invoice_id) == -1
						})
						this.snackbar = {
							value: true,
							text: this.selected_rows.length + ' Invoices Deleted',
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
                    