
<template>
	<v-app>
		<div v-if="$store.getters.auth.isAuth && $store.state.init_state">
			<APPNavbar class="no-print"> </APPNavbar>
			<v-main>
				<router-view class="mx-2" />

			</v-main>
		</div>
		<div v-else-if="$store.state.init_state">
			<v-main>
				<router-view />

			</v-main>
		</div>
	</v-app>
</template>
      
<script>
	import APPNavbar from './components/Navbar.vue'
	import { auth } from './firebase'

	export default {
		components: {
			APPNavbar
		},
		computed: {
			auth() {
				return this.$store.getters.auth;
			}
		},
        	name: 'App',

		data: () => ({
			//
		}),
		mounted() {
			// this.$store.dispatch('init');
			auth.onAuthStateChanged(user => {
				if (user) {
					this.$store.dispatch('init', user.uid)

				} else {
					this.$store.dispatch('logout')
				}
			})
			this.$vuetify.rtl = true
            
		},
	
	};
</script>

<style>
  @import url("./assets/style.css");
	.report-table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid;

		text-align: start;
	}
	.report-table th {
		padding: 5px;
		border: 1px solid;
		text-align: start !important;
		background: gray;
		color: white;
	}
	.report-table td {
		padding: 5px;
		border: 1px solid;
		/* text-align: left !important; */
	}
	@media print {
		.no-print {
			display: none;
		}
        .only-print {
			display: block !important;
		}
	}
		.only-print {
			display: none;
		}
    
</style>