<template>
  <Nav/>
  <v-container>
    <v-row>
        <v-col cols="6">
            <v-card color="pink" :to="{name: 'setup'}" class="text-center">
                <v-icon dark right size="x-large">mdi-cog</v-icon>
                <h4>Setup</h4>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card color="primary" :to="{name: 'transition'}" class="text-center">
                <v-icon dark right size="x-large">mdi-transit-connection-horizontal</v-icon>
                <h4>Transition</h4>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card color="success" :to="{name: 'active_users'}" class="text-center">
                <v-icon dark right size="x-large">mdi-account-check</v-icon>
                <h4>Active Users List</h4>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card color="warning" :to="{name: 'black_listed_users'}" class="text-center">
                <v-icon dark right size="x-large">mdi-account-cancel</v-icon>
                <h4>Black Listed Users List</h4>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import isAdmin from '../../composables/isAdmin.js'

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
      if(isAdmin() == 0){
        this.$router.push({ name: 'sign_in'})
      }
    },

    methods:{
    }
}
</script>

<style>

</style>