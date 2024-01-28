<template>
    <div>
        <v-container fluid class="login-container">
            <v-layout row wrap class="d-flex  align-center justify-center">
                
                <v-flex xs12 lg4 xl4 class="bg-main-1 login-container d-flex align-center">
                    <v-card width="100%" color="transparent" class="elevation-0 px-2">
                        <v-card-text class="mb-4 hidden-md-and-up">
                            <!-- <v-img class="d-flex mx-auto align-center" :src="logobw" max-width="200px" alt="" /> -->
                        </v-card-text>
                        <v-card-title  primary-title>
                            <h1>Reset Password</h1>
                        </v-card-title>
                        <v-card-subtitle>
                            Enter your email to recover your account.
                        </v-card-subtitle>
                        <v-card-text class="mt-3">
                            <form @submit.prevent="login">
                                <v-text-field dense autocomplete="false" prepend-inner-icon="far fa-envelope"
                                    outlined filled placeholder="email" v-model="user.email">
                                </v-text-field>
                                <v-btn type="submit"  block color="primary" :loading="btn_loading">Send Link</v-btn>
                            </form>
                        </v-card-text>
                        <v-card-text class="text-center">
                            <h3>
                                <v-btn to="/login" text>⬅️ Back to login</v-btn>
                            </h3>
                            <br>
                        </v-card-text>

                    </v-card>
                </v-flex>
                <v-flex xs12 lg8 xl8 class="   hidden-sm-and-down">
                    <div class="login-container align-center justify-center " style="height:100%">
                        <!-- <v-img class="d-flex mx-auto align-center" :src="logobw" max-width="500px" alt="" /> -->

                    </div>
                </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar v-model="snackbar.value" :color="snackbar.color">
    {{snackbar.text}}
</v-snackbar>
    </div>
</template>
<script>
import {auth , sendPasswordResetEmail} from '../firebase'
    export default {
        name: 'Login',
        data: () => ({
            // logobw: require('./../assets/login-svg.svg'),
            user: {
                email: 'larefadhil@gmail.com'
            },
            btn_loading:false,
            msg : 'Wrong email or password',
            msg_error : false,
            snackbar: {
                    value: false,
                    text: '',
                    color: ''
                },
        }),
        mounted() {
            // this.$vuetify.theme.dark = true
            
        },
        methods: {
            login() {
                this.btn_loading = true
                sendPasswordResetEmail(auth,this.user.email).then((r)=>{
                    this.btn_loading = false
                    console.log('email sent')
                    console.log(r)
                    this.snackbar = {
                            value: true,
                            text: 'Reset password send to your email', 
                            color: 'success'
                        }
                }).catch(err=>{
                    this.btn_loading = false
                    this.msg = err.message
                    this.msg_error = true
                    this.snackbar = {
                            value: true,
                            text: 'The Email Address is Not Registered', 
                            color: 'danger'
                        }
                console.log(err)
                })
               
            }
        },
    };
</script>
<style lang="scss" scoped>
    .login-container {
        height: 100vh;
    }
</style>