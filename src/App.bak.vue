<template>
  <div>
    <router-view></router-view>
    <input v-model="msg">
    <p>prop: propMessage {{ propMessage }}</p>
    <p>data: msg {{ msg }}</p>
    <p>data: helloMsg {{ helloMsg }}</p>
    <p>computed: computedMsg: {{ computedMsg }}</p>
    <p>vuex-state-computed: count: {{ count }}</p>
    <p>vuex-getter-computed: doubleCount: {{ doubleCount }}</p>
    <div>
      <button @click="increment">vuex mutation +</button>
      <button @click="incrementOdd">vuex action ++</button>
    </div>
    <World />
    <Hello ref="helloComponent" />
    <p>
      <button @click="greet">use vue sub component hello method: Greet</button>
    </p>
    <VueProperty :name.sync="name"  :propA="3" @on-input-change="onInputChange"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Hello from './components/Hello.vue'
import World from './components/World'
import VueProperty from './components/vueProperty.vue';

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { symbol } from './components/a';
import { Provide, ProvideReactive } from 'vue-property-decorator';

// We declare the props separately
// to make props types inferable.
// const AppProps = Vue.extend({
//   props: {
//     propMessage: String,
//     add: Function
//   }
// })

@Component({
  props: {
    propMessage: String,
    add: Function
  },
  components: {
    Hello,
    World,
    VueProperty
  },

  // vuex 相关
  computed: {
    ...mapState([
      'count'
    ]),
    ...mapGetters(['doubleCount'])
  },
  methods: {
    ...mapMutations([
      'increment'
    ]),
    ...mapActions(['incrementIfOdd']),
  }
})
export default class App extends Vue {
  // inital prop
  propMessage!:string

  // inital data
  msg: number = 123
  name: string = '1';
  // use prop values for initial data
  helloMsg: string = 'Hello, ' + this.propMessage

  // 往子组件注入值
  @Provide() foo = 234;
  @Provide() baz = this.msg;
  @ProvideReactive() bar = this.msg;
  // @Provide(symbol)  dd = 'bar'
  @ProvideReactive(symbol) one = 'value'

  // annotate refs type
  $refs!: {
    helloComponent: Hello
  }
  // additional declaration is needed
  // when you declare some properties in `Component` decorator
  count!: number
  doubleCount!: number
  increment!: () => void
  incrementIfOdd!: () => Promise<any>
  add!:() => void

  // lifecycle hook
  mounted () {
    this.greet()
    this.$refs.helloComponent;
  }

  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // method
  greet () {
    console.log('greeting: ' + this.msg)
    this.$refs.helloComponent.sayHello()
  }

  onInputChange(...args:any[]) {
    console.log(...args);
  }

  // direct dispatch example
  incrementOdd () {
    this.incrementIfOdd().then((res:any) => {
      console.log('ok', res);
    });
    this.$store.dispatch('incrementIfOdd').then(res => {
      console.log(res);
    })
  }
 
  beforeRouteLeave (to:any, from:any, next:any) {
   console.log(to, from, next);
  }

}
</script>
