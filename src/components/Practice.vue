<template>
  <v-container>
    <v-row>
        <!-- Bottom Sheet -->
      <v-col cols="12">
        <div class="text-center">
            <v-btn text="Bottom Sheet" size="x-large" @click="sheet = !sheet"></v-btn>
            <v-bottom-sheet v-model="sheet" inset>
            <v-card class="text-center" height="200">
                <v-card-text>
                <v-btn variant="text" @click="sheet = !sheet">
                    close
                </v-btn>
                <br>
                <div>
                    This is a bottom sheet.
                </div>
                </v-card-text>
            </v-card>
            </v-bottom-sheet>
        </div>
      </v-col>
      <!-- Grid system -->
      <v-col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
        <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Excepturi minus incidunt iure quo iste pariatur eligendi dignissimos, 
            explicabo, quibusdam ipsam accusamus. Assumenda quam doloribus accusamus, 
            adipisci animi eligendi deleniti eum!
        </h1>
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
        <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Excepturi minus incidunt iure quo iste pariatur eligendi dignissimos, 
            explicabo, quibusdam ipsam accusamus. Assumenda quam doloribus accusamus, 
            adipisci animi eligendi deleniti eum!
        </h1>
        <!-- Ratings -->
      </v-col>
      <v-col cols="12">
         <v-rating v-model="rating" class="ma-2" density="default"></v-rating>
      </v-col>
      <!-- Slider-->
      <v-col cols="12">
         <v-slider v-model="slider" label=""></v-slider>
      </v-col>
      <v-col cols="12">
         {{slider}}
      </v-col>
      <!-- Range Slider-->
      <v-col cols="12">
         <v-range-slider v-model="range_slider" label=""></v-range-slider>
      </v-col>
      <v-col cols="12">
         {{range_slider}}
      </v-col>
    </v-row>
  </v-container>

  <v-card width="400" style="margin: auto">
    <v-responsive
      :style="{ background: `rgb(${red}, ${green}, ${blue})` }"
      height="300px"
    ></v-responsive>

    <v-card-text>
      <v-slider
        v-model="red"
        :max="255"
        :step="1"
        label="R"
        hide-details
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="red"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>

      <v-slider
        v-model="green"
        :max="255"
        :step="1"
        label="G"
        hide-details
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="green"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>

      <v-slider
        v-model="blue"
        :max="255"
        :step="1"
        label="B"
        hide-details
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="blue"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
  <!-- Item Groups -->
   <v-item-group mandatory>
    <v-container>
      <v-row>
        <v-col
          v-for="n in 4"
          :key="n"
          cols="12"
          md="3"
        >
          <v-item v-slot="{ isSelected, toggle }">
            <v-card
              :color="isSelected ? 'primary' : ''"
              class="d-flex align-center"
              dark
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <div
                  class="text-h3 flex-grow-1 text-center"
                >
                  {{ isSelected ? 'Selected' : 'Click Me!' }}
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue';
export default {
    components: {
        Footer
    },
    data(){
        return{
            sheet: false,
            rating: 0,
            slider: 0.00,
            range_slider: [0,10],
            red: 64,
            green: 128,
            blue: 10,
        }
    },
    methods:{
    }
}
</script>

<style>

</style>