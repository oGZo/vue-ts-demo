<template>
<div>
  <router-view></router-view>
  <p>{{name}}</p>
  <button @click="toPage">回上一页</button>
  <button @click="$router.push('/b/c')">go c</button>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
// import Component from 'vue-class-component';

// @Component
// export default class BB extends Vue {
//   name = 'b'
//   toPage() {
//     this.$router.go(-1);
//   }
// }

export default Vue.extend({
  data() {
    return {
      name: 'b',
    }
  },
  watch: {
    $route:{
      handler(...args) {
        console.log(args.length, ...args);
      },
      immediate: false
    }
  },
  methods: {
    toPage() {
      this.$router.go(-1);
    }
  }
}) 
</script>

