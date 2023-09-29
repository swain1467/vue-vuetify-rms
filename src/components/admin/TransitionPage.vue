<template>
  <Nav/>
  <v-container>
    <v-row>
        <v-col cols="12">
          <v-toolbar>
            <v-autocomplete prepend-icon="mdi-city-variant" v-model="selCity" :items="cityList" item-title="city_name" item-value="id" label="Select City/Town" @blur="getHouseData(); getArea();"></v-autocomplete>
            &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
            <v-text-field type="text" prepend-icon="mdi-magnify" label="Search" placeholder="Search..." @input="getHouseData();" v-model="txtSearch" clearable></v-text-field>
          </v-toolbar>
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
              <v-autocomplete prepend-icon="mdi-select-marker" v-model="selArea" :items="areaList" item-title="area_name" item-value="id" label="Select Area"></v-autocomplete>
              <v-autocomplete prepend-icon="mdi-home-city-outline" v-model="selType" :items="typeList" item-title="type" item-value="id" label="Select Propert Type"></v-autocomplete>
              <v-text-field type="text" prepend-icon="mdi-cash-multiple" label="Advance" placeholder="8000" hint="Enter your advance amount" v-model="txtAdvance" clearable></v-text-field>
              <v-text-field type="text" prepend-icon="mdi-cash" label="Rent" placeholder="4000" hint="Enter your rent per month" v-model="txtRentAmount" clearable></v-text-field>
              <v-text-field type="date" prepend-icon="mdi-calendar-range" label="Available From" placeholder="13/07/2023" hint="Select a date" v-model="txtAvailableFromDate" clearable></v-text-field>
               <!-- <v-date-picker elevation="24"></v-date-picker> -->
              <v-text-field type="text" prepend-icon="mdi-phone" label="Contact No." placeholder="8917618902" hint="Enter contact number" v-model="txtContactNo" clearable></v-text-field>
              <v-textarea prepend-icon="mdi-map-marker" label="Detailed Address" placeholder="New colony house number NH123" hint="Enter your address" v-model="txtDetailedAddress" clearable></v-textarea>
            </v-card-body>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="warning" @click="SaveData" dark>Save&nbsp;<v-icon v-if="showIcon" dark right>mdi-folder-edit</v-icon><v-progress-circular v-else color="dark" indeterminate></v-progress-circular></v-btn>
              <v-btn color="red-darken-1" variant="text" @click="closeEdit">Close<v-icon dark right>mdi-close-box</v-icon></v-btn>
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
import changeDate from '../../composables/changeDate.js'

export default {
    components:{
        Nav,Footer
    },
    data(){
        return{
          token:'',
          user_id: '',

          id: '',
          selCity:'',
          cityList:'',
          selArea:'',
          areaList:'',
          selType:'',
          typeList:'',
          txtAdvance:'',
          txtRentAmount:'',
          txtAvailableFromDate:'',
          txtContactNo:'',
          txtDetailedAddress:'',

          houseList:[],
          itemsPerPage: 5,
          headers: [
            { title: 'Sl No', align: 'center', key: 'sl_no' },
            { title: "User's Mail", align: 'start', key: 'user.email' },
            { title: 'Contact No', align: 'center', key: 'contact_no' },
            { title: 'Avl From', align: 'center', key: 'from_date' },
            { title: 'Type', align: 'start', key: 'type.type' },
            { title: 'Area', align: 'start', key: 'area.area_name' },
            { title: 'City', align: 'start', key: 'city.city_name' },
            { title: 'Action', align: 'end', key: 'actions' }
          ],
          dialogDelete: false,
          dialogEdit: false,
        }
    },

    mounted() { 
      if(isAdmin() == 0){
          this.$router.push({ name: 'sign_in'})
      }
      this.token = JSON.parse(localStorage.getItem('token'))
      this.user_id = JSON.parse(localStorage.getItem('user_id'))
      this.getCity()
      this.getType()
    },

    methods:{
        //City List
        getCity(){
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        axios.get( 'auth/GetCity',config)
        .then(
            res => {
                this.cityList = res.data.aaData
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
        },
        //Property List
        getType(){
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        axios.get( 'auth/GetType',config)
        .then(
            res => {
                this.typeList = res.data.aaData
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
        },
        //Area List
        getArea(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            const bodyParameters = {
            city_id: this.selCity
            };
            axios.post( 'auth/GetArea',bodyParameters,config)
            .then(
                res => {
                    this.areaList = res.data.aaData
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );
        },
        getHouseData(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            const bodyParameters = {
            city_id: this.selCity,
            search: this.txtSearch
            };
            axios.post( 'auth/GetHouseDetailsList',bodyParameters,config)
            .then(
                res => {
                    this.houseList = res.data.aaData
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );
        },
        // Delete operation
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
                        this.getHouseData()
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
        // Edit operation
        editData(data){
            this.showIcon = true
            this.id = data.id
            this.dialogEdit = true
            this.selArea = data.area_id
            this.selType = data.type_id
            
            this.txtAdvance = data.advance
            this.txtRentAmount = data.rent
            this.txtAvailableFromDate = changeDate(data.from_date)
            this.txtContactNo = data.contact_no
            this.txtDetailedAddress = data.detailed_address
        },
        SaveData (){
            this.showIcon = false
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };

        const bodyParameters = {
            id: this.id,
            selCity: this.selCity,
            selArea: this.selArea,
            selHouseType: this.selType,

            txtAdvance: this.txtAdvance,
            txtRentAmount: this.txtRentAmount,
            txtAvailableFromDate: this.txtAvailableFromDate,
            txtContactNo: this.txtContactNo,
            txtDetailedAddress: this.txtDetailedAddress,
            user_id: JSON.parse(localStorage.getItem('user_id'))
        
        };
        axios.post( 'auth/UpdateHouse',bodyParameters,config)
        .then(
            res => {
                if(res.data.status == 'Success'){
                    this.$toast.success(res.data.message, {
                        position: 'top'
                    })
                    this.dialogEdit = false
                    this.getHouseData()
                    this.showIcon = true
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
        },
        closeEdit () {
            this.dialogEdit = false
        },
    }
}
</script>

<style>

</style>