<template>
	<div>
		<v-container px-1>
<!-- {{rows}} -->
			<!-- <v-layout>
				<table class="report-table" style="width:100%" border="1">
					<thead>
						<tr>
							<th>#</th>
							<th>
								{{$store.getters.language.data.money_move_type.money_move_type_name}}
							</th>
							<th>
								{{$store.getters.language.data.accounts.total_expense}}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in groups" :key="index">
							<td>{{index+1}}</td>
							<td>{{item.money_move_type_name}}</td>
							<td>{{(item.total  || 0).toLocaleString()}}</td>
						</tr>
					</tbody>
				</table>
			</v-layout> -->
			<div >
				<h3 >
				 کۆی گشتی کۆتایی :  {{(total[0].total || 0).toLocaleString()}}
				</h3>
                <br>
                <h3>
				  کۆی گشتی فڕۆش : {{(total[0].total_invoice_discount || 0).toLocaleString()}}
                </h3>
                <br>
                <h3 class="mb-4">
                کۆی گشتی داشکاندن : {{(total[0].total_invoice_price || 0).toLocaleString()}}
                </h3>
			</div>
			<v-layout>
				<table class="report-table" style="width:100%" border="1">
					<thead>
						<tr>
							<th>#</th>
                            <th>
                                {{$store.getters.language.data.invoices.invoice_name}}
                            </th>
							<th>
								{{$store.getters.language.data.invoices.invoice_date}}
							</th>

							<th>
								{{$store.getters.language.data.invoices.invoice_price}}
							</th>
							<th>
								{{$store.getters.language.data.invoices.invoice_discount}}
							</th>
                            <th>
                                {{$store.getters.language.data.invoices.final_price}}
                            </th>
                            <th>
                                {{$store.getters.language.data.invoices.invoice_note}}
                            </th>
							<th>
								{{$store.getters.language.data.users.user_name}}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in rows" :key="index">
							<td>{{index+1}}</td>
                            <td>{{item.invoice_name}}</td>
							<td>{{new Date(item.invoice_date).toISOString().split('T')[0]}}</td>
							<td>{{(item.invoice_price || 0).toLocaleString()}}</td>
							<td>{{(item.invoice_discount || 0).toLocaleString()}}</td>
							<td>{{(item.final_price || 0).toLocaleString()}}</td>
							<td>{{item.invoice_note}}</td>
							<td>{{item.user_name}}</td>
                            <td class="no-print">
                                <v-btn
                                    :to="'/invoices-list/'+item.invoice_id"
                                    target="_blank"
                                    color="primary"
                                    dark
                                    small
                                    class="mx-1"
                                    >
                                    وردبینی
                                    </v-btn
                                >
                            </td>

						</tr>
					</tbody>
				</table>
			</v-layout>

		</v-container>
	</div>
</template>
<script>
	import requests from '../../requests/invoices.request.js'
	export default {
		data() {
			return {
				rows: [],
				total: {},
				groups: [],
				loading: false,
			}
		},
		props: {
			query: {
				type: Object,
				default: () => { }
			}
		},
		mounted() {
			this.openReport()
		},
		methods: {
			openReport() {
				this.loading = true
				let query = this.$props.query
				requests.reportInvoices(query).then(res => {
					console.log(res)
					this.rows = res.data.invoices
					console.log(this.rows)
					this.total = res.data.total
					// this.groups = res.data.groups
					this.loading = false
				})
			}
		},
	}
</script>