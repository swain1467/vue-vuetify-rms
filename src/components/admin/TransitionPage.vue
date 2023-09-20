<template>
  <Nav/>
  <v-container>
    <v-row>
        <v-col cols="6">
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