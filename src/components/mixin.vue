<template>
<div>
  <p>{{name}}</p>
  <button @click="toPage">去b页面</button>
</div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import testMixin from '../mixins/test.vue';
import myMixin from '../mixins/My.vue';


@Component
export default class AA extends mixins(testMixin, myMixin) {
  name = 'a'
  toPage() {
    console.log(this.showTestComponentOptions())
    console.log(this.showMyComponentOptions())


    
    this.$router.push('/b');
  }
}
</script>

