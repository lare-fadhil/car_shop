
<template>
    <v-app>
        <APPNavbar></APPNavbar>
        <v-main>
        <router-view/>
        </v-main>
    </v-app>
</template>
      
<script>
import APPNavbar from './components/Navbar.vue'
export default {
    components:{
        APPNavbar
    },
    computed: {
        // vuetify theme change to dark



    },
  mounted() {
    this.$vuetify.rtl = true
  },
    name: 'App',

    data: () => ({
        //
    }),
};
</script>