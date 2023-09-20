<template>
  <Nav/>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-autocomplete prepend-icon="mdi-city-variant" v-model="selCity" :items="cityList" item-title="city_name" item-value="id" label="Select City/Town" @blur="getArea(); getHouseList();"></v-autocomplete>
      </v-col>
      <v-col cols="4">
        <v-autocomplete prepend-icon="mdi-select-marker" v-model="selArea" :items="areaList" item-title="area_name" item-value="id" label="Select Area" @blur="getHouseList();"></v-autocomplete>
      </v-col>
      <v-col cols="4">
        <v-autocomplete prepend-icon="mdi-home-city-outline" v-model="selType" :items="typeList" item-title="type" item-value="id" label="Select Propert Type" @blur="getHouseList();"></v-autocomplete>
      </v-col>
    </v-row>
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
                <v-icon size="small" class="me-2" @click="seeData(item.raw)">mdi-eye</v-icon>
            </template>
        </v-data-table>
        <v-dialog v-model="dialogSeeData" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">See Details</v-card-title>
            <v-card-body>
              <v-text-field readonly type="text" prepend-icon="mdi-city-variant" label="City" placeholder="8000" hint="Enter your advance amount" v-model="txtCity" clearable></v-text-field>
              <v-text-field readonly type="text" prepend-icon="mdi-select-marker" label="Area" placeholder="8000" hint="Enter your advance amount" v-model="txtArea" clearable></v-text-field>
              <v-text-field readonly type="text" prepend-icon="mdi-home-city-outline" label="Property Type" placeholder="8000" hint="Enter your advance amount" v-model="txtType" clearable></v-text-field>
              <v-text-field readonly type="text" prepend-icon="mdi-cash-multiple" label="Advance" placeholder="8000" hint="Enter your advance amount" v-model="txtAdvance" clearable></v-text-field>
              <v-text-field readonly type="text" prepend-icon="mdi-cash" label="Rent" placeholder="4000" hint="Enter your rent per month" v-model="txtRentAmount" clearable></v-text-field>
              <v-text-field readonly type="text" prepend-icon="mdi-calendar-range" label="Available From" placeholder="13/07/2023" hint="Select a date" v-model="txtAvailableFromDate" clearable></v-text-field>
              <v-text-field readonly type="text" prepend-icon="mdi-phone" label="Contact No." placeholder="8917618902" hint="Enter contact number" v-model="txtContactNo" clearable></v-text-field>
              <v-text-field readonly type="text" prepend-icon="mdi-map-marker" label="Contact No." placeholder="8917618902" hint="Enter contact number" v-model="txtDetailedAddress" clearable></v-text-field> 
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red-darken-1" variant="text" @click="closeEdit">Close<v-icon dark right>mdi-close-box</v-icon></v-btn>
            </v-card-actions>
            </v-card-body>
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
      selCity:'',
      cityList:'',
      selArea:'',
      areaList:'',
      selType:'',
      typeList:'',
      dialogSeeData: false,
      houseList: [],
      itemsPerPage: 5,
        headers: [
          { title: 'Property Type', align: 'center', key: 'type.type' },
          { title: 'Avl. From', align: 'center', key: 'from_date' },
          { title: 'Action', align: 'center', key: 'actions' }
        ],
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
  },
  methods: {
    // Area data
    getArea(){
        console.log(this.selCity);
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
    // House List
    getHouseList(){
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        const bodyParameters = {
          city: this.selCity,
          area: this.selArea,
          type: this.selType
        };
        axios.post( 'auth/GetAvailableHouseList',bodyParameters,config)
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
    seeData(data){
        this.dialogSeeData = true
        this.txtCity = data.city.city_name
        this.txtArea = data.area.area_name
        this.txtType = data.type.type
        this.txtAdvance = data.advance
        this.txtRentAmount = data.rent
        this.txtAvailableFromDate = data.from_date
        this.txtContactNo = data.contact_no
        this.txtDetailedAddress = data.detailed_address
    },
    closeEdit () {
      this.dialogSeeData = false
    },
  }
}
</script>

<style>

</style>