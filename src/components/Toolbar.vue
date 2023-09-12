<template>
  <v-container>
    <v-row>
        <v-col cols="12">
            <v-toolbar  app:elevation="10" color="default" dark>
                <v-toolbar-title>Rent management system</v-toolbar-title>
                <v-btn @click="goToSignIn" icon><v-icon>mdi-login</v-icon></v-btn>
                <v-btn @click="goToChangePassword" icon><v-icon>mdi-lock-reset</v-icon></v-btn>
                <v-btn @click="goToSignUp" icon><v-icon>mdi-plus</v-icon></v-btn>   
                <v-btn @click="goToHome" icon><v-icon>mdi-home</v-icon></v-btn>   
            </v-toolbar>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods:{
        goToSignIn(){
            this.$router.push({ name: 'sign_in'})
        },
        goToSignUp(){
            this.$router.push({ name: 'sign_up'})
        },
        goToChangePassword(){
            this.$router.push({ name: 'change_password'})
        },
        goToHome(){
            this.$router.push({ name: 'home'})
        }
    }
}
</script>

<style>

</style>