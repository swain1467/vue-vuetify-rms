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
              <v-autocomplete prepend-icon="mdi-city-variant" v-model="selCity" :items="cityList" item-title="city_name" item-value="id" label="Select City/Town" @blur="getArea()"></v-autocomplete>
              <v-autocomplete prepend-icon="mdi-select-marker" v-model="selArea" :items="areaList" item-title="area_name" item-value="id" label="Select Area"></v-autocomplete>
              <v-autocomplete prepend-icon="mdi-home-city-outline" v-model="selType" :items="typeList" item-title="type" item-value="id" label="Select Propert Type"></v-autocomplete>
              <v-text-field type="text" prepend-icon="mdi-cash-multiple" label="Advance" placeholder="8000" hint="Enter your advance amount" v-model="txtAdvance" clearable></v-text-field>
              <v-text-field type="text" prepend-icon="mdi-cash" label="Rent" placeholder="4000" hint="Enter your rent per month" v-model="txtRentAmount" clearable></v-text-field>
              <v-text-field type="date" prepend-icon="mdi-calendar-range" label="Available From" placeholder="13/07/2023" hint="Select a date" v-model="txtAvailableFromDate" clearable></v-text-field>
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
import changeDate from '../../composables/changeDate.js'

export default {
    components:{
        Nav,Footer
    },
    data() {
      return {
        showIcon: true,
        token:'',
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
        //City List
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
            //Property Type List
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
        //Property List posted by the user
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
        // Area data
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
        // Edit operation
        editData(data){
            this.showIcon = true
            this.id = data.id
            this.dialogEdit = true
            this.selCity = data.city_id
            this.getArea()
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