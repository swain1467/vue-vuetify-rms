<template>
  <Nav/>
  <v-container>
    <v-row>
        <v-col cols="6">
            <v-card color="pink" :to="{name: 'find'}" class="text-center">
                <v-icon dark right size="x-large">mdi-home-analytics</v-icon>
                <h4>Find</h4>
                <v-icon dark right size="x-large">mdi-office-building</v-icon>
                <h4>Property</h4>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card color="indigo" :to="{name: 'post'}" class="text-center">
                <v-icon dark right size="x-large">mdi-home-group</v-icon>
                <h4>Post</h4>
                <v-icon dark right size="x-large">mdi-office-building</v-icon>
                <h4>Property</h4>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card color="warning" :to="{name: 'post_history'}" class="text-center">
                <v-icon dark right size="x-large">mdi-home-group</v-icon>
                <h4>My Post</h4>
                <v-icon dark right size="x-large">mdi-history</v-icon>
                <h4>History</h4>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'

export default {
    components:{
        Nav,Footer
    },
    data(){
        return{
            user_name:'',
            user_type:'',
            user_id:'',

            showEmail: true,
        }
    },

    mounted() { 
      this.user_name = JSON.parse(localStorage.getItem('user_name'))
      this.user_id = JSON.parse(localStorage.getItem('user_id'))
      this.user_name = JSON.parse(localStorage.getItem('user_name'))
    },

    methods:{
    }
}
</script>

<style>

</style>