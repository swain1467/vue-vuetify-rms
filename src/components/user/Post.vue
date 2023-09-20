<template>
  <Nav/>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-autocomplete prepend-icon="mdi-city-variant" v-model="selCity" :items="cityList" item-title="city_name" item-value="id" label="Select City/Town" @blur="getArea"></v-autocomplete>
        <v-autocomplete prepend-icon="mdi-select-marker" v-model="selArea" :items="areaList" item-title="area_name" item-value="id" label="Select Area"></v-autocomplete>
        <v-autocomplete prepend-icon="mdi-home-city-outline" v-model="selType" :items="typeList" item-title="type" item-value="id" label="Select Propert Type"></v-autocomplete>
        <v-text-field type="text" prepend-icon="mdi-cash-multiple" label="Advance" placeholder="8000" hint="Enter your advance amount" v-model="txtAdvance" clearable></v-text-field>
        <v-text-field type="text" prepend-icon="mdi-cash" label="Rent" placeholder="4000" hint="Enter your rent per month" v-model="txtRentAmount" clearable></v-text-field>
        <v-text-field type="date" prepend-icon="mdi-calendar-range" label="Available From" placeholder="13/07/2023" hint="Select a date" v-model="txtAvailableFromDate" clearable></v-text-field>
        <v-text-field type="text" prepend-icon="mdi-phone" label="Contact No." placeholder="8917618902" hint="Enter contact number" v-model="txtContactNo" clearable></v-text-field>
        <v-textarea prepend-icon="mdi-map-marker" label="Detailed Address" placeholder="New colony house number NH123" hint="Enter your address" v-model="txtDetailedAddress" clearable></v-textarea>
        <div class="float-right">
          <v-btn color="green" @click="savePost" dark>Save&nbsp;<v-icon v-if="showIcon" dark right>mdi-folder-upload</v-icon><v-progress-circular v-else color="dark" indeterminate></v-progress-circular></v-btn>
        </div>
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
    // Save post property
    savePost(){
        this.showIcon = false
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        const bodyParameters = {
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
        axios.post( 'auth/SavePostProperty',bodyParameters,config)
        .then(
            res => {
                this.showIcon = true
                if(res.data.status == 'Success'){
                    this.$toast.success(res.data.message, {
                        position: 'top'
                    })
                    this.$router.push({ name: 'post_history'})
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
    }
  }
}
</script>

<style>

</style>