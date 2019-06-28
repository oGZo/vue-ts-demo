<template>
<div>
  <p>{{name}}</p>
  <button @click="toPage">go b page</button>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

export function a():void
export function a(){
  console.log('');
}

@Component
export default class AA extends Vue {
  name = 'a'
  toPage() {
    this.$router.push('/b');
  }
}
</script>

