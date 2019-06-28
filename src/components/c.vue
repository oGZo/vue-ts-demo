<template>
<div>
  c
  <SlotTest>
    <!-- <template v-slot="slotProps">
      {{ slotProps.user.firstName }}    
    </template> -->
  </SlotTest>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import SlotTest from './slot-test.vue';

export default Vue.extend({
  components: {
    SlotTest
  },
  data() {
    return {
      name: 'c',
    }
  },
  watch: {
    $route:{
      handler(...args) {
        console.log(args.length, ...args);
      },
      immediate: true
    }
  },
  methods: {
    toPage() {
      this.$router.push('/b');
    }
  }
}) 

</script>

