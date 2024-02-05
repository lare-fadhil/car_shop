
<template>
		<div v-if="$store.getters.auth.isAuth && $store.state.init_state">
        <v-app-bar app class="navbar no-print">
            <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
            <v-btn icon="" to="/">
                <v-icon color="white">mdi-home</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon="" @click="logout">

				<v-icon color="white">mdi-logout</v-icon>
			</v-btn>
            <v-app-bar-title>Piston</v-app-bar-title>
        </v-app-bar>
        <!-- <v-navigation-drawer v-model="drawer" app :right="$store.getters.language.rtl">
            <template v-slot:prepend>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="text-center">{{$store.getters.language.app_name}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <v-divider class="mt-3"></v-divider>
            <v-list shaped>
                <v-list-item v-for="(item , index) in navigation_links" :key="index" :to="item.path">
                <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list>
        </v-navigation-drawer> -->
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            drawer: null,
        }
    },
    computed: {
        languages() {
            return this.$store.getters.languages
        },
        navigation_links() {
            return [
                
                    // {
                    //     path : '/car_items-list',
                    //     title : 'Car Items',
                    // },
            
                    {
                        path : '/cars-list',
                        title : 'Cars',
                    },
            
                    {
                        path : '/expenses-list',
                        title : 'Expenses',
                    },
            
                    // {
                    //     path : '/invoice_items-list',
                    //     title : 'Invoice Items',
                    // },
            
                    {
                        path : '/invoices-list',
                        title : 'Invoices',
                    },
                    {
                        path : '/invoices-view',
                        title : 'Invoices',
                    },
            
                    {
                        path : '/items-list',
                        title : 'Items',
                    },
            
                    {
                        path : '/users-list',
                        title : 'Users',
                    },
            
            ]
        },
    },
    methods: {
			logout() {
				this.$store.dispatch('logout');
			},

		},
}
</script>
        