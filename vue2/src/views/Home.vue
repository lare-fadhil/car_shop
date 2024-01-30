
<template>
	<div>
		<v-container>
			<v-layout row wrap mt-4>

				<!-- <ul>
                        <li v-for="(item, index) in navigation_links" :key="index">
                        <router-link :to="item.path">{{item.title}}</router-link>
                        </li>
                    </ul> -->
				<v-flex xs12 lg4 xl3 md4 sm4 v-for="(item, index) in navigation_links" :key="index">
					<v-col >
						<v-card class="ma-3 rounded-lg " outlined :style="{borderColor: item.color_code}" style="border :3px solid" :to=item.path>
							<v-card-title class="px-0" :style="{ color: item.color_code}">
								<div class="ma-4 my-10" style="width:100%;">
									<h1 class="text-center">{{item.title.toUpperCase()}}</h1>
								</div>
							</v-card-title>
						</v-card>
					</v-col>

				</v-flex>

			</v-layout>
		</v-container>
	</div>
</template>
<script>
	export default {
		methods: {
			to(path) {
				this.$router.push(path)
			}
		},
		computed: {
			navigation_links() {
				return [
{
						path: '/items-list',
						title: 'کاڵاکان',
                        color_code: '#3f51b5'
					},
					

					{
						path: '/cars-list',
						title: 'ئۆتۆمۆبیلەکان',
						color_code: '#FFC107'
					},
// {
// 						path: '/car_items-list',
// 						title: 'car_items',
// 						color_code: '#3f51b5'
// 					},
					{
						path: '/expenses-list',
						title: 'خەرجیەکان',
                        color_code: '#607D8B'
					},

					{
						path: '/invoices-list',
						title: 'فڕۆشتن',
                        color_code: '#4CAF50'
					},

					// {
					// 	path: '/invoice_items-list',
					// 	title: 'invoice_items',
                    //     color_code: '#FF5722'
					// },


					

					// {
					// 	path: '/users-list',
					// 	title: 'users',
                    //     color_code: '#E91E63'
					// },

				]
			},
		},
	}
</script>
