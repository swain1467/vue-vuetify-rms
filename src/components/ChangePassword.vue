<template>
  <Toolbar/>
  <v-container>
    <v-row v-if="showEmail">
      <v-col cols="12">
        <v-text-field type="email" prepend-icon="mdi-email-box" label="Email" placeholder="johndoe@gmail.com" hint="Enter your email" v-model="txtEmail" clearable></v-text-field>
        <div class="float-right">
          <v-btn color="dark" @click="sendOTP" dark>Send OTP&nbsp;<v-icon v-if="showLoader" dark right>mdi-send</v-icon><v-progress-circular v-else color="dark" indeterminate></v-progress-circular></v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-text-field type="text" prepend-icon="mdi-message-text-lock" label="OTP" placeholder="AF1H5J" hint="Enter your otp sent to your mail id" v-model="txtOTP" clearable></v-text-field>
        <br>
        <v-text-field type="password" prepend-icon="mdi-key-variant" label="Password" placeholder="Johndoe@123" hint="Enter your password" v-model="txtPassword" clearable></v-text-field>
        <br>
        <v-text-field type="password" prepend-icon="mdi-key-chain-variant" label="Confirm Password" placeholder="Johndoe@123" hint="Confirm your password" v-model="txtConfPassword" clearable></v-text-field>
        <div class="float-right">
          <v-btn color="pink" @click="handleSubmit" dark>Submit&nbsp;<v-icon dark right>mdi-account-arrow-right</v-icon></v-btn>
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
            txtOTP: '',
            txtPassword: '',
            txtConfPassword: '',
            showEmail: true,
            showLoader: true,
        }
    },
    methods:{
        sendOTP(){
            const data = {
                email: this.txtEmail
            }
            this.showLoader = false
            axios.post('SendOTP', data)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        this.showLoader = true
                        this.showEmail= false
                    }else if(res.data.status == 'Error'){
                        this.$toast.warning(res.data.message, {
                            position: 'top'
                        })
                    }else if(res.data.status == 'Failure'){
                        this.$toast.error(res.data.message, {
                            position: 'top'
                        })
                    }else{
                        this.$toast.show(res.data.message, {
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
        },

        async handleSubmit(){
            const data = {
                email: this.txtEmail,
                otp: this.txtOTP,
                password: this.txtPassword,
                confirm_password: this.txtConfPassword,
            }

            axios.post('Verify', data)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        this.$router.push({ name: 'sign_in'})
                    }else if(res.data.status == 'Error'){
                        this.$toast.warning(res.data.message, {
                            position: 'top'
                        })
                    }else if(res.data.status == 'Failure'){
                        this.$toast.error(res.data.message, {
                            position: 'top'
                        })
                    }else{
                        this.$toast.show(res.data.message, {
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