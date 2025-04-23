
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
        <v-container v-else class="my-2">
            <form @submit.prevent="addInvoices" autocomplete="off" class="no-print">

                <v-layout row wrap>
                    <v-flex xs12 lg12 xl12 md12 sm12>
                        <div class="d-flex justify-space-between align-center">

                            <h1 class="mt-4 mb-7 no-print">فڕۆشتنەکان :</h1>


                            <v-btn color="primary" :loading="loading_btn"
                                type="submit">{{$store.getters.language.data.invoices.add_btn}}
                                <v-icon>mdi-invoice-check-outline</v-icon>

                            </v-btn>
                        </div>
                    </v-flex>
                    <v-flex xs12 lg4 xl4 md3 sm4>
                        <v-text-field v-model="invoices.invoice_name" type="text"
                            :label="$store.getters.language.data.invoices.invoice_name" dense class="mx-1" filled
                            outlined required>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs12 lg4 xl4 md3 sm4>
                        <v-text-field v-model="invoices.invoice_price" type="text"
                            :label="$store.getters.language.data.invoices.invoice_price" dense class="mx-1" filled
                            outlined required disabled>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs12 lg4 xl4 md3 sm4>
                        <v-text-field v-model="invoices.invoice_discount" type="text"
                            :label="$store.getters.language.data.invoices.invoice_discount" dense class="mx-1" filled
                            outlined required>
                        </v-text-field>
                    </v-flex>

                    <!-- <v-flex xs12 lg4 xl4 md3 sm4>
                        <v-text-field v-model="invoices.invoice_date" type="datetime-local" :label="$store.getters.language.data.invoices.invoice_date" dense
                            class="mx-1"  filled outlined >
                        </v-text-field>
                    </v-flex> -->
                    <v-flex xs12 lg4 xl4 md3 sm4>
                        <v-text-field v-model="invoices.invoice_note" type="text"
                            :label="$store.getters.language.data.invoices.invoice_note" dense class="mx-1" filled
                            outlined>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg4 xl4 md3 sm4>
                        <v-select class="mx-1" clearable :items="users" v-model="invoices.user_id" dense filled outlined
                            item-text="user_name" item-value="user_id" :return-object="false"
                            :label="$store.getters.language.data.users.user_name" disabled>
                        </v-select>
                    </v-flex>


                </v-layout>
            </form>
            <form @submit.prevent="addInvoiceItems" autocomplete="off" class="no-print">
                <v-layout row wrap>
                    <v-flex xs12 lg4 xl4 md3 sm4>
                        <v-autocomplete class="mx-1" clearable :items="items" v-model="invoice_items.item_id" dense
                            filled outlined item-text="item_name" item-value="item_id" :return-object="false"
                            :label="$store.getters.language.data.items.item_name">
                            <template #item="{ item }">
                                <div>
                                    <div>{{ item.item_name }}</div>
                                    <div class="caption text--secondary">{{ item.item_note }}</div>
                                </div>
                            </template>
                        </v-autocomplete>
                    </v-flex>

                    <!-- <v-flex xs12 lg4 xl4 md3 sm4>
						<v-select class="mx-1" clearable :items="invoices" v-model="invoice_items.invoice_id" dense filled outlined item-text="invoice_id" item-value="invoice_id" :return-object="false" :label="$store.getters.language.data.invoices.invoice_id">
						</v-select>
					</v-flex> -->

                    <!-- <v-flex xs12 lg4 xl4 md3 sm4>
						<v-autocomplete class="mx-1" clearable :items="items" v-model="invoice_items.item_id" dense filled outlined item-text="item_name" item-value="item_id" :return-object="false" :label="$store.getters.language.data.items.item_name">
						</v-autocomplete>
					</v-flex> -->
                    <v-flex xs12 lg4 xl4 md3 sm4>
                        <v-autocomplete class="mx-1" clearable :items="items" v-model="invoice_items.item_id" dense
                            filled outlined item-text="item_barcode" item-value="item_id" :return-object="false"
                            :label="$store.getters.language.data.items.item_barcode">
                        </v-autocomplete>
                    </v-flex>

                    <!-- <v-flex xs12 lg4 xl4 md3 sm4>
						<v-text-field v-model="invoice_items.invoice_item_price" type="text" :label="$store.getters.language.data.invoice_items.invoice_item_price" dense class="mx-1" filled outlined required>
						</v-text-field>
					</v-flex> -->

                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="invoice_items.invoice_item_qty" type="number"
                            :label="$store.getters.language.data.invoice_items.invoice_item_qty" dense class="mx-1"
                            filled outlined required>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs12 lg2 xl2 md2 sm4>
                        <v-btn color="success" :loading="loading_btn" type="submit"><v-icon>mdi-plus</v-icon> زیادکردنی
                            کاڵا بۆ وەسڵ</v-btn>
                    </v-flex>
                </v-layout>
            </form>
            <v-layout row wrap>
                <v-flex xs12 lg9 xl9 md9 sm12>
                    <table style="width:100%" class="mt-7">
                        <tbody>
                            <tr>
                                <td>
                                    <p>{{$store.getters.language.data.invoices.invoice_name}} :
                                        {{invoices.invoice_name}}</p>
                                </td>
                                <td>
                                    <p>{{$store.getters.language.data.invoices.invoice_id}} : {{id}}</p>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <p>{{$store.getters.language.data.invoices.user_id}} : {{user_name}}</p>
                                </td>
                                <td>
                                    <p>{{$store.getters.language.data.invoices.invoice_date}} : {{new Date
                                        ().toLocaleDateString()}}</p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>{{$store.getters.language.data.invoices.invoice_price}} :
                                        {{invoices.invoice_price}}</p>

                                </td>

                                <td>
                                    <p>{{$store.getters.language.data.invoices.invoice_discount}} :
                                        {{invoices.invoice_discount}}</p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>نرخی کۆتایی : {{invoices.invoice_price - invoices.invoice_discount}}</p>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </v-flex>
             <v-flex xs12 lg3 xl3 md3 sm12 class="pt-1">
  <v-img :src="logobw" width="100%" class="mx-auto" alt="Piston" contain></v-img>
</v-flex>

            </v-layout>
            <v-layout row wrap>
                <!-- table for invoice_item_list -->
                <table class="report-table">
                    <thead>
                        <tr>
                            <!-- <th>Invoice ID</th> -->
                            <th>ناوی کاڵا</th>
                            <th>بارکۆد</th>
                            <th>تێبینی</th>
                            <th>نرخ</th>
                            <th>عەدەد</th>
                            <th>کۆی گشتی</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="invoice_item,index  in list_invoice_items_view" :key="index">
                            <!-- <td>{{invoice_item.invoice_id}}</td> -->
                            <td>{{invoice_item.item_name}}</td>
                            <td>{{invoice_item.item_barcode}}</td>
                            <td>{{invoice_item.item_note}}</td>
                            <td>{{invoice_item.invoice_item_price}}</td>
                            <td>{{invoice_item.invoice_item_qty}}</td>
                            <td>{{invoice_item.invoice_item_price * invoice_item.invoice_item_qty}}</td>
                            <!-- delete  -->
                            <td class="no-print">
                                <v-btn color="error" icon class="mx-1"
                                    @click="list_invoice_items_view.splice(index, 1) , list_invoice_items.splice(index, 1)">
                                    <v-icon> mdi-delete-outline </v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
	import items_requests from '../../requests/invoice_items.request.js'
    
	export default {
		data() {
			return {
                logobw: require('./../../assets/invoice.png'),
				invoices: {
					invoice_price: 0,
					invoice_discount: 0,
				},
				invoice_items: {
					invoice_item_qty: 1
				},
				id: 0,
				user_name: '',
				list_invoice_items: [],
				list_invoice_items_view: [],
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
			items() {
				return this.$store.getters.items_list
			},
			user() {
				return this.$store.getters.user
			}
		},
		mounted() {
            console.log(this.$store.getters.user)
            console.log("this.$store.getters.user")
            // this.incoices.user_id = this.$store.getters.user.user_id
			this.invoices.user_id = this.user.user_id
			this.readInvoices();
		},
		methods: {
			addInvoiceItems() {
				// list_invoice_items
				if (this.invoice_items.item_id != undefined && this.invoice_items.invoice_item_qty > 0) {
					this.loading_btn = true
					// search in items list to get item name and add it to list_invoice_items_view find the selected item
					let item_detail = this.items.find(item => item.item_id == this.invoice_items.item_id)
					this.invoice_items.invoice_item_price = item_detail.item_price
					// add item name to list_invoice_items_view
					this.list_invoice_items_view.push({
						item_name: item_detail.item_name,
                        item_note: item_detail.item_note,
						item_barcode: item_detail.item_barcode,
						invoice_item_price: this.invoice_items.invoice_item_price,
						invoice_item_qty: this.invoice_items.invoice_item_qty

						// invoice_item_qty: this.invoice_items.invoice_item_qty
					})
					this.list_invoice_items.push(this.invoice_items)
					this.invoices.invoice_price = this.invoices.invoice_price + (this.invoice_items.invoice_item_price * this.invoice_items.invoice_item_qty)
					this.loading_btn = false
					// this.snackbar = {
					// 	value: true,
					// 	text: 'زیادکرا',
					// 	color: 'success'
					// }
					this.invoice_items = {
						invoice_item_qty: 1
					}
					return
				}
				else {
					this.snackbar = {
						value: true,
						text: 'تکایە هەموو خانەکان پڕبکەرەوە',
						color: 'error'
					}
				}

			},
			addInvoices() {
				this.loading_btn = true
				requests.createInvoices(this.invoices).then(r => {
					if (r.status == 200) {
						this.user_name = this.users.find(user => user.user_id == this.invoices.user_id).user_name
						this.id = r.data.new_data.invoice_id
						this.rows.push(
							r.data.new_data
						)
						// for all invoice_items in list_invoice_items add invoice_id
						this.list_invoice_items.forEach(item => {
							item.invoice_id = r.data.new_data.invoice_id
						})
						this.addInvoiceItemsList()
						
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
			addInvoiceItemsList() {
				this.loading_btn = true
				items_requests.createInvoiceItemsList(
					{
						list: this.list_invoice_items
					}
				).then(r => {
					if (r.status == 200) {
						window.print()
						this.invoices = {
							invoice_price: 0,
							user_id: this.user.user_id,
							invoice_discount: 0,
						}

						this.list_invoice_items = []
						this.list_invoice_items_view = []
						
					} else {
						this.snackbar = {
							value: true,
							text: 'Fail to add Invoice Items',
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
                    