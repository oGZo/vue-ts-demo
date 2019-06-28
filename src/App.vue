<template>
<div>
  <router-view></router-view>
  <button v-for="(key, i) in comp" :key="i" @click="toPage(i)" :style="{color: i === currentComp ? '#6eb92b': ''}">{{i}}</button>
  <component 
    :is="comp[currentComp]"
    v-model="value"
    :name.sync="name"
    :propMessage="propMessage"
    :propB="propB"
    :propC="propC"
    :add="add"
  ></component>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

import ClassApp from './views/class.vue';
import NormalApp from './views/normal.vue';
import PropertyApp from './views/property.vue';

export default Vue.extend({
  name: 'APP',
  data() {
    // @ts-ignore
    window.vm = this;
    return {
      show: false,
      comp: {
        normal: 'NormalApp',
        'class': 'ClassApp',
        'property': 'PropertyApp',
      },
      currentComp: 'normal',
      value: false,
      name: 'tk',
      propMessage: '121212',
      propB: '1',
      propC: '',
      add: () => {
        // @ts-ignore
        // this.propB += 1;
      }
    };
  },
  components: {
    ClassApp,
    NormalApp,
    PropertyApp,
  },
  methods: {
    toPage(name: string) {
      this.currentComp = name;
    }
  }
})
</script>
