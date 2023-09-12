<template>
  <Toolbar/>
  <v-container>
    <v-row>
        <v-col cols="12">
            <v-carousel cycle :interval="interval">
                <v-carousel-item src="../assets/img/h.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h0.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h1.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h2.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h3.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h4.jpg" cover></v-carousel-item>
                <v-carousel-item src="../assets/img/h5.jpg" cover></v-carousel-item>
            </v-carousel>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-card
                loading
                title="About Us"
                subtitle="Rent management system"
                text="- As our business grows, consider expanding your property portfolio or offering additional services such as rent house, Commercial places like office space, stall, etc."
                >
            </v-card>
        </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<script>
import Toolbar from '../components/Toolbar.vue';
import Footer from '../components/Footer.vue';
export default {
    components: {
        Toolbar,
        Footer
    },
    data() {
        return {
            interval: 2000
        }
    }
}
</script>
