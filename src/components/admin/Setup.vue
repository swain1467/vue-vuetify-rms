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
              City
            </v-window-item>

            <v-window-item value="tabArea">
              Area
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
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'

export default {
    components:{
        Nav,Footer
    },
    data(){
        return{
            tab: null,
        }
    },

    mounted() { 

    },

    methods:{
    }
}
</script>

<style>

</style>