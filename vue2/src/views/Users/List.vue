
<template>
    <div>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
            <v-container v-else class="my-2">
                <form @submit.prevent="addUsers" autocomplete="off">
                    <v-layout row wrap>
        
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="users.user_name" type="text" :label="$store.getters.language.data.users.user_name" dense
                            class="mx-1"  filled outlined  required>
                        </v-text-field>
                    </v-flex>
                
                    <v-flex xs12 lg2 xl2 md3 sm4>
                        <v-text-field v-model="users.firebase_uid" type="textarea" :label="$store.getters.language.data.users.firebase_uid" dense
                            class="mx-1"  filled outlined  required>
                        </v-text-field>
                    </v-flex>
                
                        <v-flex xs12 lg2 xl2 md3 sm4>
                                <v-select class="mx-1" clearable  :items="['0','1','2']" v-model="users.user_role" dense  filled outlined  item-text="user_role"
                                    item-value="user_role" :return-object="false" :label="$store.getters.language.data.users.user_role">
                                </v-select>
                        </v-flex>
                
                        <v-flex xs12 lg2 xl2 md2 sm4>
                            <v-btn  color="primary" :loading="loading_btn" type="submit" >{{$store.getters.language.data.users.add_btn}}</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
<v-layout row wrap mt-5>
    <v-flex xs12>
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers"  show-select v-model="selected_rows"    :search="search" :items="rows" class="elevation-0"
                    item-key="user_id">
                    <template v-slot:[`item.user_id`]="{ item }">
                        <div>
                            <v-btn icon :to="'/users-list/'+item.user_id"  color="teal" class="mx-1">
                            <v-icon> mdi-pencil-outline </v-icon>
                            </v-btn>
                            <v-btn color="error" icon class="mx-1" @click="selectUsers(item)" >
                                <v-icon> mdi-delete-outline </v-icon>
                            </v-btn>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>
            
            <v-card-actions v-if="selected_rows.length > 0">
                <v-btn color="error" @click="deleteUsersList">{{$store.getters.language.data.users.delete_list_btn}}</v-btn>
            </v-card-actions>
                
        </v-card>
    </v-flex>
</v-layout>
</v-container>
<v-dialog v-model="delete_dialog" persistent max-width="400">
    <v-card>
        <v-card-title>
            {{$store.getters.language.data.users.delete_question}}
        </v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text class="elevation-0" @click="delete_dialog = false">
                {{$store.getters.language.data.users.cancel_btn}}
            </v-btn>
            <v-btn color="error" class="elevation-0" @click="deleteUsers(selected_users.user_id)">
                {{$store.getters.language.data.users.yes_btn}}
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
    import requests from './../../requests/users.request.js'
    export default {
        data() {
            return {
                users: {},
                search: '',
                loading : true,
                loading_btn:false,
                selected_rows : [],
                snackbar: {
                    value: false,
                    text: '',
                    color: ''
                },
                rows:[],
                selected_users : {},
                delete_dialog: false,
                headers: [

                    
                        { 
                            text: this.$store.getters.language.data.users.user_name,
                            align: 'start',
                            sortable: true,
                            value: 'user_name',
                        },
                        { 
                            text: this.$store.getters.language.data.users.firebase_uid,
                            align: 'start',
                            sortable: true,
                            value: 'firebase_uid',
                        },
                        { 
                            text: this.$store.getters.language.data.users.user_role,
                            align: 'start',
                            sortable: true,
                            value: 'user_role',
                        },   {
            text: this.$store.getters.language.data.actions,
            align: 'start',
            sortable: true,
            value: 'user_id',
        }
                ],
            }
        },
        computed: {
        },
        mounted(){
            this.readUsers();
        },
        methods: {
            addUsers() {
                this.loading_btn = true
                requests.createUsers(this.users).then(r => {
                    if (r.status == 200) {
                        this.users = {}
                        this.rows.push(
                            r.data.new_data
                        )
                        this.snackbar = {
                            value: true,
                            text: 'Users Added',
                            color: 'success'
                        }
                    } else {
                        this.snackbar = {
                            value: true,
                            text: 'Fail to add Users',
                            color: 'error'
                        }
                    }
                })
                .finally(() => {
                    this.loading_btn = false
                })

            },
            deleteUsers(user_id) {
                requests.deleteUsers(user_id).then(r => {
                    this.delete_dialog = false
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{
                            return f.user_id != user_id
                        })
                        this.snackbar = {
                            value: true,
                            text: 'Users Deleted',
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
            
            deleteUsersList() {
                let ids = this.selected_rows.map(m => m.user_id)
                requests.deleteUsersList(ids).then(r => {
                    if (r.status == 200) {
                        this.rows = this.rows.filter(f =>{  
                            return ids.indexOf(f.user_id) == -1
                        })
                        this.snackbar = {
                            value: true,
                            text: this.selected_rows.length+' Users Deleted',
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
            
            readUsers() {
                this.loading = true
                requests.getAllUsers().then(r => {
                    if (r.status == 200) {
                        this.rows = r.data.rows
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
            selectUsers(i) {
                this.selected_users = i
                this.delete_dialog = true
            },
        },
    }
</script>
                    