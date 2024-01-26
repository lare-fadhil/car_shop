
<template>
    <div>
        <v-container>
        <v-layout row wrap mt-4>
         
          
                    <ul>
                        <li v-for="(item, index) in navigation_links" :key="index">
                        <router-link :to="item.path">{{item.title}}</router-link>
                        </li>
                    </ul>
                    <v-flex xs12 lg3 xl3 md4 sm4 v-for="(item, index) in navigation_links" :key="index">
                        <v-card>
                           
                            <v-card-title >
                                 <router-link :to="item.path"> <h3>{{item.title}}</h3></router-link>
                            </v-card-title>
                            
                        </v-card>
                    </v-flex>
                   
                    
                   
                   
        </v-layout>
        </v-container>
    </div>
</template>
<script>
  export default {
    computed: {
      navigation_links() {
          return [
            
                {
                    path : '/car_items-list',
                    title : 'car_items',
                },
        
                {
                    path : '/cars-list',
                    title : 'cars',
                },
        
                {
                    path : '/expenses-list',
                    title : 'expenses',
                },
        
                {
                    path : '/invoice_items-list',
                    title : 'invoice_items',
                },
        
                {
                    path : '/invoices-list',
                    title : 'invoices',
                },
        
                {
                    path : '/items-list',
                    title : 'items',
                },
        
                {
                    path : '/users-list',
                    title : 'users',
                },
        
        ]
      },
    },
  }
</script>