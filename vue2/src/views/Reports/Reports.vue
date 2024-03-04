<template>
	<div>
		<v-container class="no-print">
			<v-layout row wrap>
				<h1 class="my-7">
					<!-- {{$store.getters.language.data.report.reports}} -->
                    ڕاپۆرت
				</h1>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs12 lg3 xl3 md4>
					<v-text-field label="From" type="date" dense outlined class="mx-1" v-model="query.from"></v-text-field>
				</v-flex>
				<v-flex xs12 lg3 xl3 md4>
					<v-text-field label="To" type="date" dense outlined class="mx-1" v-model="query.to"></v-text-field>
				</v-flex>
                	<v-flex xs12 lg3 xl3 md4>
					<v-select :items="users" v-model="query.user_id" :label="$store.getters.language.data.users.user_name" item-text="user_name" item-value="user_id" dense outlined class="mx-1" clearable></v-select>
				</v-flex>
				<!-- <v-flex xs12 lg3 xl3 md4>
					<v-select :items="accounts" v-model="query.account_id" :label="$store.getters.language.data.accounts.account_name" item-text="account_name" item-value="account_id" dense outlined class="mx-1" clearable></v-select>
				</v-flex>
				<v-flex xs12 lg3 xl3 md4>
					<v-select :items="money_move_type" v-model="query.money_move_type_id" :label="$store.getters.language.data.money_move_type.money_move_type_name" item-text="money_move_type_name" item-value="money_move_type_id" dense outlined class="mx-1" clearable></v-select>
				</v-flex>
				<v-flex xs12 lg3 xl3 md4>
					<v-select :items="subjects" v-model="query.subject_id" :label="$store.getters.language.data.subjects.subject_name" item-text="subject_name" item-value="subject_id" dense outlined class="mx-1" clearable></v-select>
				</v-flex>
			
				<v-flex xs12 lg3 xl3 md4>
					<v-autocomplete :items="instructors" v-model="query.instructor_id" :label="$store.getters.language.data.instructors.instructor_name" item-text="instructor_name" item-value="instructor_id" dense outlined class="mx-1" clearable></v-autocomplete>
				</v-flex> -->
				<!-- <v-flex xs12 lg3 xl3 md4>
					<v-autocomplete :items="customers" v-model="query.customer_id" :label="$store.getters.language.data.customers.customer_username" item-text="customer_username" item-value="customer_id" dense outlined class="mx-1" clearable></v-autocomplete>
				</v-flex>
				<v-flex xs12 lg3 xl3 md4>
					<v-select class="mx-1" clearable :items="['slemani','hawler','karkuk','dhok','zaxo','baghdad','darbandixan','halabja','rania','others']" v-model="query.customer_city" dense outlined item-text="customer_city" item-value="customer_city" :return-object="false" :label="$store.getters.language.data.customers.customer_city">
					</v-select>
				</v-flex>
				<v-flex xs12 lg3 xl3 md4>
					<v-select class="mx-1" clearable :items="['elly_online_store','shein_store_iraq','pages']" v-model="query.customer_type" dense  outlined item-text="customer_type" item-value="customer_type" :return-object="false" :label="$store.getters.language.data.customers.customer_type">
					</v-select>
				</v-flex> -->
				<!-- <v-flex xs12 lg3 xl3 md4 v-show="showDep">
					<v-text-field :label="$store.getters.language.data.students.student_stage" type="number" dense outlined class="mx-1" v-model="query.student_stage"></v-text-field>
				</v-flex>
				<v-flex xs12 lg3 xl3 md4 v-show="showDep">
					<v-autocomplete :items="academic_years" v-model="query.academic_year_id" :label="$store.getters.language.data.academic_year.academic_year_name" item-text="academic_year_name" item-value="academic_year_id" dense outlined class="mx-1" clearable></v-autocomplete>
				</v-flex>
				<v-flex xs12 lg3 xl3 md4 v-show="showDep">
					<v-autocomplete :items="departments" v-model="query.department_id" :label="$store.getters.language.data.departments.department_name" item-text="department_name" item-value="department_id" dense outlined class="mx-1" clearable></v-autocomplete>
				</v-flex> -->
			</v-layout>
			<v-layout row wrap>
				<v-flex xs12 lg3 md4 xl3 v-for="(item,index) in reports_list" :key="index">
					<v-card class="ma-1" @click="openReport(item.id)">
						<v-card-title>{{item.title}}</v-card-title>
						<v-card-text>
							<span class="primary--text" v-for="(i,inx) in splitString(item.query)" :key="inx">{{i}}*</span>
							<br>
							<span v-for="(i,inx) in splitString(item.optional)" :key="inx">{{i}}</span>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
			<v-flex xs12 lg12 sm12 xl12 class="my-5">
				<v-btn color="primary" @click="print">
					<!-- {{$store.getters.language.data.report.print}} -->
					Print
				</v-btn>
			</v-flex>
			<v-layout row wrap>
				<v-progress-linear v-if="loading" :indeterminate="true" color="primary" height="5"></v-progress-linear>
			</v-layout>
		</v-container>
        <ExpensesReport :query="query" v-if="selectedReport == 1 && !loading"></ExpensesReport>
		<!-- 
		<IncomesReport :query="query" v-if="selectedReport == 2 && !loading"></IncomesReport>
		<DepositsReport :query="query" v-if="selectedReport == 3 && !loading"></DepositsReport>
		<WithdrawsReport :query="query" v-if="selectedReport == 4 && !loading"></WithdrawsReport>
		<InstructorReport :query="query" v-if="selectedReport == 5 && !loading"></InstructorReport>
		<StudentSubjectReport :query="query" v-if="selectedReport == 6 && !loading"></StudentSubjectReport> -->
		<!-- <CustomerReport :query="query" v-if="selectedReport == 1 && !loading"></CustomerReport> -->
		<!-- <AccountReport :query="query" v-if="selectedReport == 8 && !loading"></AccountReport>
		<AllAccounts :query="query" v-if="selectedReport == 9 && !loading"></AllAccounts>
		<AllInstructors :query="query" v-if="selectedReport == 10 && !loading"></AllInstructors>
		<AllStudents :query="query" v-if="selectedReport == 11 && !loading"></AllStudents> -->
	</div>
</template>

<script>
	import ExpensesReport from './Expenses.vue'
	// import IncomesReport from './Reports/Income.vue'
	// import DepositsReport from './Reports/Deposits.vue'
	// import WithdrawsReport from './Reports/Withdraw'
	// import InstructorReport from './Reports/Instructors'
	// import StudentSubjectReport from './Reports/StudentSubject.vue'
	// import CustomerReport from './Reports/Customers.vue'
	// import AccountReport from './Reports/Accounts.vue'
	// import AllAccounts from './Reports/AllAccounts.vue'
	// import AllInstructors from './Reports/AllInstructors.vue'
	// import AllStudents from './Reports/AllStudents.vue'

	export default {
		components: {
            ExpensesReport,
			// , IncomesReport, DepositsReport, WithdrawsReport, InstructorReport, StudentSubjectReport, StudentReport, AccountReport, AllAccounts, AllInstructors, AllStudents
			// CustomerReport
		},
		data() {
			return {

				query: {
					from: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
					to: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
				},
				id: '',
				loading: false,
				selectedReport: 0,
				snackbar: {
					value: false,
					text: '',
					color: ''
				},
			}
		},
		computed: {
	
			users() {
				return this.$store.getters.users_list
			},
            		reports_list() {
				return this.$store.getters.language.data.report.reports_list
			},
		
		},
		methods: {
			print() {
				const theme = this.$vuetify.theme.isDark
				this.$vuetify.theme.isDark = false
				setTimeout(() => {
					window.print()
					this.$vuetify.theme.isDark = theme

				}, 1000)
			},
			openReport(id) {
				this.loading = true
				this.selectedReport = id
				setTimeout(() => {
					this.selectedReport = id
					this.loading = false
				}, 1000);
			},
			splitString(str) {
				return str ? str.split(',') : []
			}
		},
	}
</script>

<style>
</style>