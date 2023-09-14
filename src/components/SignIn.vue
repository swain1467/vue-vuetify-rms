<template>
  <Toolbar/>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field type="text" prepend-icon="mdi-email-box" label="Email" placeholder="johndoe@gmail.com" hint="Enter your email" v-model="txtEmail" clearable></v-text-field>
        <br>
        <v-text-field type="password" prepend-icon="mdi-key-variant" label="Password" placeholder="Johndoe@123" hint="Enter your password" v-model="txtPassword" clearable></v-text-field>
         <div class="float-right">
          <v-btn color="primary" @click="handleSubmit" dark>Submit <v-icon dark right>mdi-account-arrow-right</v-icon></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<script>
import axios from 'axios'
import Toolbar from '../components/Toolbar.vue';
import Footer from '../components/Footer.vue';
export default {
    components: {
        Toolbar,
        Footer
    },
    data(){
        return{
            txtEmail: '',
            txtPassword: '',
        }
    },
    methods:{
        async handleSubmit(){
            const data = {
                email: this.txtEmail,
                password: this.txtPassword,
            }

            axios.post('LogIn', data)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                        position: 'top'
                        })

                        localStorage.setItem('token', JSON.stringify(res.data.token.original.access_token));
                        localStorage.setItem('token_type', JSON.stringify(res.data.token.original.token_type));
                        localStorage.setItem('expires_in', JSON.stringify(res.data.token.original.expires_in));
                        localStorage.setItem('user_email', JSON.stringify(res.data.token.original.user_email));
                        localStorage.setItem('user_type', JSON.stringify(res.data.token.original.user_type));
                        localStorage.setItem('user_id', JSON.stringify(res.data.token.original.user_id));
                        localStorage.setItem('user_name', JSON.stringify(res.data.token.original.user_name));
                        
                        this.$router.push({ name: 'user_dashboard'})
                    }else if(res.data.status == 'Error'){
                        this.$toast.error(res.data.message, {
                        position: 'top'
                        })
                    }
                    setTimeout(this.$toast.clear, 1000)
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        }
    }
}
</script>

<style>

</style>