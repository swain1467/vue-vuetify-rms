<template>
  <Nav/>
  <v-container>
    <v-row>
        <v-col cols="12">
          <v-tabs v-model="tab" bg-color="warning">
            <v-tab value="tabCity">City</v-tab>
            <v-tab value="tabArea">Area</v-tab>
            <v-tab value="tabPropertyType">Property Type</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="tabCity">
              <v-toolbar>
                <v-btn color="info" dark class="mb-2" @click="addCity()">
                  <v-icon class="me-1">mdi-plus-box</v-icon> Add City
                </v-btn>
              </v-toolbar>
              <v-data-table
                v-model:items-per-page="cityItemsPerPage"
                :headers="cityHeaders"
                :items="cityList"
                :sort-by="[{ key: 'city_name', order: 'asc' }]"
                item-value="city_name"
                class="elevation-1"
              >
                <template v-slot:[`item.status`]="{ item }">
                  <v-icon v-if="item.raw.status" color="success" size="small" class="me-2">mdi-check-all</v-icon>
                  <v-icon v-else color="error" size="small" class="me-2">mdi-close-outline</v-icon>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon size="small" class="me-2" @click="updateCity(item.raw)">mdi-pencil</v-icon>
                </template>
              </v-data-table>
              <!-- City Dialog -->
              <v-dialog v-model="cityDialog" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">{{cityDialogHeader}}</v-card-title>
                  <v-card-body>
                    <v-text-field type="text" prepend-icon="mdi-city-variant" label="City Name" placeholder="Bhubaneswar" hint="Enter city name" v-model="txtCityName" clearable></v-text-field>
                    <v-radio-group prepend-icon="mdi-list-status" label="Status" inline v-model="txtCityStatus">
                      <v-radio value="1"></v-radio><v-icon color="success">mdi-check-bold</v-icon>
                      &ensp;&ensp;&ensp;
                      <v-radio value="0"></v-radio><v-icon color="error">mdi-close</v-icon>
                    </v-radio-group>
                  </v-card-body>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="saveCityData" dark>Save&nbsp;<v-icon v-if="showCityIcon" dark right>mdi-content-save-move</v-icon><v-progress-circular v-else color="dark" indeterminate></v-progress-circular></v-btn>
                    <v-btn color="red-darken-1" variant="text" @click="closeDialog">Close<v-icon dark right>mdi-close-box</v-icon></v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-window-item>

            <v-window-item value="tabArea">
              <v-toolbar>
                <v-btn color="info" dark class="mb-2" @click="addArea()">
                  <v-icon class="me-1">mdi-plus-box</v-icon> Add Area
                </v-btn>
                &ensp;&ensp;&ensp;
                <v-autocomplete prepend-icon="mdi-city-variant" v-model="selCity" :items="areaCityList" item-title="city_name" item-value="id" label="Select City/Town" @blur="getArea"></v-autocomplete>
              </v-toolbar>
            </v-window-item>

            <v-window-item value="tabPropertyType">
              Property Type
            </v-window-item>
        </v-window>
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
            user_id:'',
            tab: null,
            cityItemsPerPage: 10,
            cityList:[],
            cityHeaders: [
              { title: 'Sl No', align: 'center', key: 'sl_no', width: '10%' },
              { title: "City Name", align: 'start', key: 'city_name', width: '50%' },
              { title: "Status", align: 'center', key: 'status', width: '20%' },
              { title: 'Action', align: 'end', key: 'actions', width: '10%' }
            ],
            cityDialog: false,
            cityDialogHeader: '',
            showCityIcon: true,
            txtCityId: '',
            txtCityName: '',
            txtCityStatus: '1',

            areaCityList: ''
        }
    },

    mounted() { 
      if(isAdmin() == 0){
        this.$router.push({ name: 'sign_in'})
      }
      this.token = JSON.parse(localStorage.getItem('token'))
      this.user_id = JSON.parse(localStorage.getItem('user_id'))
      this.GetCityList()
    },

    methods:{
      GetCityList(){
        this.token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        axios.get('auth/GetCityList',config)
        .then(
            res => {
                this.cityList = res.data.aaData
                this.areaCityList = res.data.aaData1
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
      },
      addCity(){
        this.cityDialog = true
        this.cityDialogHeader = 'Add City'
        this.txtCityId = ''
        this.txtCityName = ''
        this.txtCityStatus= '1'
      },
      // Close Dialog
      closeDialog () {
        this.cityDialog = false
      },
      updateCity(data) {
        this.cityDialog = true
        this.txtCityId = data.id
        this.txtCityName = data.city_name
        if(data.status == 1){
          this.txtCityStatus= '1'
        }else{
          this.txtCityStatus= '0'
        }
        this.cityDialogHeader = 'Update City'
      },
      saveCityData(){
          this.showCityIcon = false
          const config = {
              headers: { Authorization: `Bearer ${this.token}` }
          };
          const bodyParameters = {
              id: this.user_id,
              city_id: this.txtCityId,
              city_name: this.txtCityName,
              city_status: this.txtCityStatus,
          };
          axios.post( 'auth/SaveCity',bodyParameters,config)
          .then(
            res => {
                if(res.data.status == 'Success'){
                    this.$toast.success(res.data.message, {
                        position: 'top'
                    })
                    this.showCityForm = false;
                    
                }else if(res.data.status == 'Error'){
                    this.$toast.warning(res.data.message, {
                        position: 'top'
                    })
                }else{
                    this.$toast.warning('Sorry something went wrong', {
                        position: 'top'
                    })
                }
                this.GetCityList()
                this.showCityIcon = true
                this.cityDialog = false
                setTimeout(this.$toast.clear, 1000)
              }
          ).catch(
              err => {
                  console.log(err);
              }
          );
      },
    }
}
</script>

<style>

</style>