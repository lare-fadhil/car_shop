<template>
    <div>
        <v-container fluid class="login-container">
            <v-layout row wrap class="d-flex  align-center justify-center">
               
                <v-flex xs12 lg4 xl4 class="bg-main-1 login-container d-flex align-center">
                    <v-container>
                        <v-layout row wrap justify-space-around>
                            <v-flex xs10>
                                <v-card width="100%" color="transparent" class="elevation-0 px-2">
                                    <v-card-text class="mb-4 hidden-md-and-up">
                                        <!-- <v-img class="d-flex mx-auto align-center" :src="logobw" max-width="200px"
                                            alt="" /> -->
                                    </v-card-text>
                                    
                                    <v-card-subtitle>
                                        Welcome back.
                                    </v-card-subtitle>
                                    <v-card-text class="mt-3">
                                        <form @submit.prevent="login">
                                            <v-text-field autocomplete="false" prepend-inner-icon="far fa-envelope"
                                                 outlined filled  label="Email" v-model="user.email" dense>
                                            </v-text-field>
                                            <v-text-field prepend-inner-icon="fas fa-lock" v-model="user.password"
                                                 outlined filled type="password" label="Password" dense>
                                            </v-text-field>
                                            <v-btn type="submit"  block color="primary" :loading="btn_loading">
                                                Login</v-btn>
                                        </form>
                                    </v-card-text>
                                    <v-card-text class="text-center">
                                        <h3>
                                            <v-btn to="/reset-password" text>forgot password?</v-btn>
                                        </h3>
                                        <br>
                                    </v-card-text>

                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
                <v-flex xs12 lg8 xl8 class="   hidden-sm-and-down">
                    <div class="login-container align-center justify-center " style="height:100%">
                        <!-- <v-img class="d-flex mx-auto align-center" :src="logobw"  width="500px" alt="" /> -->
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar v-model="msg_error" color="error" bottom center>
            {{msg}}
        </v-snackbar>
    </div>
</template>
<script>
    import {
        auth,
        signInWithEmailAndPassword
    } from '../firebase.js'
    export default {
        name: 'Login',
        data: () => ({
            // logobw: require('./../assets/login-svg.svg'),
            user: {
                email: '',
                password: ''
            },
            btn_loading: false,
            msg: 'Wrong email or password',
            msg_error: false,
        }),
        mounted() {
            // this.$vuetify.theme.dark = true

        },
        methods: {
            login() {
                this.btn_loading = true
                signInWithEmailAndPassword(auth, this.user.email, this.user.password)
                    .then((r) => {
                        localStorage.setItem('auth', 'auth')
                        this.$router.push('/')
                        // this.$store.dispatch('login', r.user.uid)
                        this.btn_loading = false

                    })
                    .catch(err => {
                        this.btn_loading = false
                        this.msg = err.message
                        this.msg_error = true
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