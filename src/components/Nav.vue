<template>
  <v-container>
    <v-row>
        <v-col cols="12">
            <v-navigation-drawer expand-on-hover rail>
                <v-list>
                    <v-list-item prepend-icon="mdi-account-check" :title="user_name" :subtitle="user_type"></v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list density="compact">
                    <v-list-item :to="{name: 'user_dashboard'}" prepend-icon="mdi-home-account" title="Dashboard" value="myfiles"></v-list-item>
                </v-list>
                <v-list density="compact">
                    <v-list-item :to="{name: 'find'}" prepend-icon="mdi-home-search" title="Find Property" value="FindProperty"></v-list-item>
                </v-list>
                <v-list density="compact">
                    <v-list-item :to="{name: 'post'}" prepend-icon="mdi-home-plus" title="Post Property" value="PostProperty"></v-list-item>
                </v-list>
                <v-list density="compact">
                    <v-list-item :to="{name: 'post_history'}" prepend-icon="mdi-folder-home-outline" title="Post History" value="PostHistory"></v-list-item>
                </v-list>
                <v-list v-if="user_type === 'ADMIN'" density="compact">
                    <v-list-item :to="{name: 'admin_dashboard'}" prepend-icon="mdi-view-dashboard" title="Admin Dashboard" value="AdminDashboard"></v-list-item>
                </v-list>
                <v-list v-if="user_type === 'ADMIN'" density="compact">
                    <v-list-item :to="{name: 'setup'}" prepend-icon="mdi-cog" title="Setup" value="Setup"></v-list-item>
                </v-list>
                <v-list v-if="user_type === 'ADMIN'" density="compact">
                    <v-list-item :to="{name: 'transition'}" prepend-icon="mdi-transit-connection-horizontal" title="Transition" value="Transition"></v-list-item>
                </v-list>
                <v-list v-if="user_type === 'ADMIN'" density="compact">
                    <v-list-item :to="{name: 'active_users'}" prepend-icon="mdi-account-check" title="Active Users List" value="ActiveUsersList"></v-list-item>
                </v-list>
                <v-list v-if="user_type === 'ADMIN'" density="compact">
                    <v-list-item :to="{name: 'black_listed_users'}" prepend-icon="mdi-account-cancel" title="Black Listed Users List" value="BlackListedUsersList"></v-list-item>
                </v-list>
                <v-list density="compact">
                    <v-list-item @click="signOut" prepend-icon="mdi-power" title="Sign Out" value="signOut"></v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            user_name:'',
            user_type:'',
            open_nav: false,
            token:''
        }
    },

    mounted() { 
    this.user_name = JSON.parse(localStorage.getItem('user_name'))
    this.user_type = JSON.parse(localStorage.getItem('user_type'))
    this.token = JSON.parse(localStorage.getItem('token'))
    const config = {
        headers: { Authorization: `Bearer ${this.token}` }
        };
    axios.get( 
        'auth/Me',
        config
    ).then(
            res => {
                if(res.data != '1'){
                    this.$router.push({ name: 'sign_in'})
                }
            }
    ).catch(
            err => {
            this.$router.push({ name: 'sign_in'})
            }
    );
    },

    methods:{
        signOut(){
            let text = 'Are you sure? want to logout.'
            if (confirm(text) == true) {
                localStorage.clear()
                this.$toast.success('You have signed out', {
                    position: 'top'
                })
                setTimeout(this.$toast.clear, 1000)
                this.$router.push({ name: 'sign_in'})
            }
        }
    }
}
</script>
