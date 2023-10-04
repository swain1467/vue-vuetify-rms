<template>
  <Practice />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Practice from '../components/Practice.vue';

export default defineComponent({
  name: 'PracticeView',

  components: {
    Practice,
  },
});
</script>
