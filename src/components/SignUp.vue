<template>
  <Toolbar/>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field type="text" prepend-icon="mdi-account" label="Name" placeholder="john Doe" hint="Enter your name" v-model="txtName" clearable></v-text-field>
        <br>
        <v-text-field type="text" prepend-icon="mdi-email-box" label="Email" placeholder="johndoe@gmail.com" hint="Enter your email" v-model="txtEmail" clearable></v-text-field>
        <br>
        <v-text-field type="password" prepend-icon="mdi-key-variant" label="Password" placeholder="Johndoe@123" hint="Enter your password" v-model="txtPassword" clearable></v-text-field>
        <br>
        <v-text-field type="password" prepend-icon="mdi-key-chain-variant" label="Confirm Password" placeholder="Johndoe@123" hint="Confirm your password" v-model="txtConfirmPassword" clearable></v-text-field>
         <div class="float-right">
          <v-btn color="primary" @click="handleSubmit" dark>Submit<v-icon dark right>mdi-account-arrow-right</v-icon></v-btn>
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
            txtName: '',
            txtEmail: '',
            txtPassword: '',
            txtConfirmPassword: '',
        }
    },
    methods:{
        async handleSubmit(){
            const data = {
                txtName: this.txtName,
                txtEmail: this.txtEmail,
                txtPassword: this.txtPassword,
                txtConfPassword: this.txtConfirmPassword,
            }

            axios.post('Register', data)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                        position: 'top'
                        })
                        this.$router.push({ name: 'sign_in'})
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