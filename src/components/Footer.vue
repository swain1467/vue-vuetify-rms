<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-img :src="require('../assets/img/Logo.png')" class="my-3" contain height="100"/>
        <v-switch class="switch-center" v-model="darkMode" @change="toggleTheme()"></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const darkMode = ref(false);

const toggleTheme = () => {
  theme.global.name.value = darkMode.value ? "dark" : "light";
};
</script>
<script>
export default {

}
</script>

<style scoped>
.switch-center {
  display: flex;
  justify-content: center;
}
</style>>