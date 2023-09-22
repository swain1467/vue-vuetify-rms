<template>
  <Nav/>
  <v-container>
    <v-row>
        <v-col cols="12">
          <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="usersList"
            :sort-by="[{ key: 'name', order: 'asc' }]"
            item-value="name"
            class="elevation-1"
          >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="success" size="small" @click="whiteListUser(item.raw)">mdi-check</v-icon>
            <v-icon color="error" size="small" @click="deleteUser(item.raw)">mdi-delete</v-icon>
          </template>
          </v-data-table>
          <!-- Black list Dialog -->
          <v-dialog v-model="dialogWhiteList" max-width="520px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to white list this user?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="whitelistConfirm">Yes</v-btn>
                <v-btn color="red-darken-1" variant="text" @click="closeDialog">Cancel</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Delete Dialog -->
          <v-dialog v-model="dialogDelete" max-width="480px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this user?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-darken-1" variant="text" @click="deleteConfirm">Yes</v-btn>
                <v-btn color="green-darken-1" variant="text" @click="closeDialog">Cancel</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<script>
import axios from 'axios'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import isAdmin from '../../composables/isAdmin.js'

export default {
    components:{
        Nav,Footer
    },
    data(){
        return{
            token:'',
            id:'',

            usersList:[],
            itemsPerPage: 10,
            headers: [
              { title: 'Sl No', align: 'center', key: 'sl_no', width: '10%' },
              { title: "User's Name", align: 'start', key: 'name', width: '30%' },
              { title: "User's Mail Address", align: 'strat', key: 'email', width: '30%' },
              { title: 'Type', align: 'center', key: 'user_type', width: '20%' },
              { title: 'Action', align: 'end', key: 'actions', width: '10%' }
            ],
            dialogDelete: false,
            dialogWhiteList: false,
        }
    },

    mounted() { 
      if(isAdmin() == 0){
        this.$router.push({ name: 'sign_in'})
      }
      this.GetBlackListUsersList()
    },

    methods:{
      GetBlackListUsersList(){
        this.token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        axios.get('auth/GetBlackListUsersList',config)
        .then(
            res => {
                this.usersList = res.data.aaData
                console.log(this.usersList);
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
      },
      // Close Dialog
      closeDialog () {
        this.dialogDelete = false
        this.dialogUpdate= false
        this.dialogWhiteList= false
        this.id = ''
      },
      // Delete operation
      deleteUser (data) {
        this.dialogDelete = true
        this.id = data.id
      },
      deleteConfirm () {
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        const bodyParameters = {
            id: this.id,
        };
        axios.post( 'auth/DeleteUser',bodyParameters,config)
        .then(
            res => {
              if(res.data.status == 'Success'){
                  this.$toast.success(res.data.message, {
                      position: 'top'
                  })
                  this.GetBlackListUsersList()
              }else if(res.data.status == 'Error'){
                  this.$toast.warning(res.data.message, {
                      position: 'top'
                  })
              }else{
                  this.$toast.warning('Sorry something went wrong', {
                      position: 'top'
                  })
              }
                setTimeout(this.$toast.clear, 1000)
              }
            ).catch(
                err => {
                    console.log(err);
                }
            ); 
        this.closeDialog()
      },
      // Black list operation
       whiteListUser (data) {
        this.dialogWhiteList = true
        this.id = data.id
      },
      whitelistConfirm () {
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        const bodyParameters = {
            id: this.id,
        };
        axios.post( 'auth/WhiteListUser',bodyParameters,config)
        .then(
            res => {
              if(res.data.status == 'Success'){
                  this.$toast.success(res.data.message, {
                      position: 'top'
                  })
                  this.GetBlackListUsersList()
              }else if(res.data.status == 'Error'){
                  this.$toast.warning(res.data.message, {
                      position: 'top'
                  })
              }else{
                  this.$toast.warning('Sorry something went wrong', {
                      position: 'top'
                  })
              }
                setTimeout(this.$toast.clear, 1000)
              }
            ).catch(
                err => {
                    console.log(err);
                }
            ); 
        this.closeDialog()
      },
      // Update User Details
      updateUser(data) {
        this.dialogUpdate = true
        this.id = data.id
        this.txtName = data.name
        this.txtEmail = data.email
        this.selUserType = data.user_type
      },
      saveData() {
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };

        const bodyParameters = {
            id: this.id,
            name: this.txtName,
            email: this.txtEmail,
            user_type: this.selUserType
        };
        axios.post( 'auth/UpdateUserDetails',bodyParameters,config)
        .then(
          res => {
              if(res.data.status == 'Success'){
                  this.$toast.success(res.data.message, {
                      position: 'top'
                  })
                  
              }else if(res.data.status == 'Error'){
                  this.$toast.warning(res.data.message, {
                      position: 'top'
                  })
              }else{
                  this.$toast.warning('Sorry something went wrong', {
                      position: 'top'
                  })
              }
              setTimeout(this.$toast.clear, 1000)
              this.GetBlackListUsersList()
              this.closeDialog()
              }
          ).catch(
              err => {
                  console.log(err);
              }
          );
      }
    }
}
</script>

<style>

</style>