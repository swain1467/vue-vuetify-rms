<template>
  <ChangePassword />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import ChangePassword from '../components/ChangePassword.vue';

export default defineComponent({
  name: 'ChangePasswordView',

  components: {
    ChangePassword,
  },
});
</script>
