<template>
  <v-container>
    <v-row>
        <v-col cols="12">
            <v-toolbar  app:elevation="10" color="default" dark>
                <v-toolbar-title>Rent management system</v-toolbar-title>
                <v-btn @click="goToSignIn" icon><v-icon>mdi-login</v-icon></v-btn>
                <v-btn icon><v-icon>mdi-lock-reset</v-icon></v-btn>
                <v-btn icon><v-icon>mdi-plus</v-icon></v-btn>   
                <v-btn @click="goToHome" icon><v-icon>mdi-home</v-icon></v-btn>   
            </v-toolbar>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-carousel cycle :interval="interval">
                <v-carousel-item src="../assets/img/h.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h0.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h1.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h2.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h3.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h4.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h5.jpg" cover></v-carousel-item>
            </v-carousel>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-card
                loading
                title="About Us"
                subtitle="Rent management system"
                text="- As our business grows, consider expanding your property portfolio or offering additional services such as rent house, Commercial places like office space, stall, etc."
                >
            </v-card>
        </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-img :src="require('../assets/img/Logo.png')" class="my-3" contain height="100"/>
        <v-switch class="switch-center" v-model="darkMode" @change="toggleTheme()"></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const darkMode = ref(false);

const toggleTheme = () => {
  theme.global.name.value = darkMode.value ? "dark" : "light";
};
</script>
<script>
export default {
    data() {
        return {
            interval: 2000
        }
    },
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
<style scoped>
.switch-center {
  display: flex;
  justify-content: center;
}
</style>>
