<template>
  <Nav/>
  <v-container>
    <v-row>
      <v-col cols="12">
          <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="houseList"
            :sort-by="[{ key: 'from_date', order: 'desc' }]"
            item-value="name"
            class="elevation-1"
          >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon size="small" class="me-2" @click="editData(item.raw)">mdi-pencil</v-icon>
            <v-icon size="small" @click="deleteData(item.raw)">mdi-delete</v-icon>
          </template>
          </v-data-table>
          <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red-darken-1" variant="text" @click="deleteItemConfirm">Yes</v-btn>
              <v-btn color="green-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Update Data</v-card-title>
            <v-card-body>
        
            </v-card-body>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="warning" variant="text" @click="SaveData">Save</v-btn>
              <v-btn color="red-darken-1" variant="text" @click="closeEdit">Close</v-btn>
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

export default {
    components:{
        Nav,Footer
    },
    data() {
      return {
        token:'',
        id: '',

        houseList:[],
        itemsPerPage: 5,
        headers: [
          { title: 'Property Type', align: 'center', key: 'type.type' },
          { title: 'Avl. From', align: 'center', key: 'from_date' },
          { title: 'Action', align: 'center', key: 'actions' }
        ],
        dialogDelete: false,
        dialogEdit: false,
      }
  },
  mounted(){
      this.token = JSON.parse(localStorage.getItem('token'))
      const config = {
          headers: { Authorization: `Bearer ${this.token}` }
      };
      const bodyParameters = {
          user_id: JSON.parse(localStorage.getItem('user_id'))
      };
      axios.post( 'auth/GetHouseList',bodyParameters,config)
      .then(
          res => {
              this.houseList = res.data.aaData;
          }
      ).catch(
          err => {
              console.log(err);
          }
      );
  },
  methods: {
    editData(data){
      this.dialogEdit = true
    },
    deleteData (data) {
      this.dialogDelete = true
      this.id = data.id
    },

    deleteItemConfirm () {
      const config = {
          headers: { Authorization: `Bearer ${this.token}` }
      };

      const bodyParameters = {
          id: this.id,
      };
      axios.post( 'auth/DeleteHouse',bodyParameters,config)
      .then(
          res => {
              if(res.data.status == 'Success'){
                  this.$toast.success(res.data.message, {
                      position: 'top'
                  })
                  const bodyParameters = {
                      user_id: JSON.parse(localStorage.getItem('user_id'))
                  };
                  axios.post( 'auth/GetHouseList',bodyParameters,config)
                  .then(
                      res => {
                          this.houseList = res.data.aaData;
                      }
                  ).catch(
                      err => {
                          console.log(err);
                      }
                  );
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
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete = false
    },
    closeEdit () {
      this.dialogEdit = false
    }
  }
}
</script>

<style>

</style>