<template>
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      user: {
        lastName: 'tk last',
        firstName: 'tk first',
      }
    }
  },
}) 
</script>

