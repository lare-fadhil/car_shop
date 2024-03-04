<template>
	<div>
		<v-container px-1>

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
			<v-layout>
				<h1 class="my-8">
				کۆی گشتی خەرجی: {{(total[0].total || 0).toLocaleString()}}
				</h1>
			</v-layout>
			<v-layout>
				<table class="report-table" style="width:100%" border="1">
					<thead>
						<tr>
							<th>#</th>

							<th>
								{{$store.getters.language.data.expenses.expense_date}}
							</th>

							<th>
								{{$store.getters.language.data.expenses.expense_amount}}
							</th>
							<th>
								{{$store.getters.language.data.expenses.expense_note}}
							</th>
							<th>
								{{$store.getters.language.data.users.user_name}}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in rows" :key="index">
							<td>{{index+1}}</td>
							<td>{{new Date(item.expense_date).toISOString().split('T')[0]}}</td>
							<td>{{(item.expense_amount || 0).toLocaleString()}}</td>
							<td>{{item.expense_note}}</td>
							<td>{{item.user_name}}</td>

						</tr>
					</tbody>
				</table>
			</v-layout>

		</v-container>
	</div>
</template>
<script>
	import requests from '../../requests/expenses.request.js'
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
				requests.reportExpenses(query).then(res => {
					console.log(res)
					this.rows = res.data.expenses
					console.log(this.rows)
					this.total = res.data.total
					// this.groups = res.data.groups
					this.loading = false
				})
			}
		},
	}
</script>