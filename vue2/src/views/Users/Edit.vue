
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
        <v-container v-else class="my-2">
            <form @submit.prevent="updateUsers" autocomplete="off">
                <v-layout row wrap>
        
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="users.user_name" type="text" :label="$store.getters.language.data.users.user_name" 
                            class="mx-1"  filled outlined dense required >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="users.firebase_uid" type="textarea" :label="$store.getters.language.data.users.firebase_uid" 
                            class="mx-1"  filled outlined dense required >
                        </v-text-field>
                    </v-flex>
                        <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-select class="mx-1" clearable  :items="['0','1','2']" v-model="users.user_role" dense  filled outlined  item-text="user_role"
                                    item-value="user_role" :return-object="false" :label="$store.getters.language.data.users.user_role">
                                </v-select>
                        </v-flex>
                
                    <v-flex xs12 lg2 xl2 md2 sm4>
                        <v-btn  color="success"    type="submit">{{$store.getters.language.data.users.update_btn}}</v-btn>
                    </v-flex>
                </v-layout>
            </form>
        </v-container>
    <v-snackbar v-model="snackbar.value" :color="snackbar.color">
        {{snackbar.text}}
    </v-snackbar>
</div>
</template>
<script>
    import requests from './../../requests/users.request.js'
    export default {
        data() {
            return {
                users: {},
                id: '',
                loading: true,
                snackbar: {
                    value: false,
                    text: '',
                    color: ''
                },
            }
        },
        computed: {
            
        },
        mounted(){
            this.id = this.$route.params.id
            this.getOneUsers()
        },
        methods: {
            getOneUsers() {
                this.loading = true
                requests.getOneUsers(this.id).then(r =>{
                    if (r.status == 200) {
                        this.users = r.data.row
                        this.loading = false
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to read Users',
                            color: 'error'
                        }
                    }
                })
                .catch(e => {
                    this.snackbar = {
                        value: true,
                        text: 'Fail to read Users',
                        color: 'error'
                    }
                })
                .finally(() => {
                    this.loading = false
                })
            },
            updateUsers() {
                this.loading = true
                requests.updateUsers(this.id,this.users).then(r => {
                    if (r.status == 200) {
                        this.snackbar = {
                            value: true,
                            text: 'Users Updated',
                            color: 'success'
                        }
                        this.loading = false
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Update Faild',
                            color: 'error'
                        }
                        this.loading = false
                    }
                })
                .catch(e => {
                    this.snackbar = {
                        value: true,
                        text: 'Update Faild',
                        color: 'error'
                    }
                    this.loading = false
                })
                .finally(() => {
                    this.loading = false
                })
            },
        },
    }
</script>
                    