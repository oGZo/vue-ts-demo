<template>
  <div>
    <input v-model="msg">
    <p>prop: propMessage {{ propMessage }}</p>
    <p>prop: propB {{ propB | reverse}}</p>
    <p>prop: propC {{ propC }}</p>
    <p>prop: sync name-syncName {{ syncName }}</p>
    <p>model: checked {{ checked }}</p>
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
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import MyMixin from "../mixins/My.vue";
import TestMixin from "../mixins/test.vue";
import Hello from '../components/Hello.vue'
import World from '../components/World'

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
interface Person {
  name: string
}


@Component({
  props: {
    propMessage: String,
    add: Function,
    propB: {
      type: String,
      default: 'default value'
    },
    propC: {
      type: [String, Boolean],
      required: true
    },
    name: String,
    checked: Boolean
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  filters: {
    reverse(v:string){
        return v && v.split('').reverse().join('') || '';
    }
  },
  components: {
    Hello,
    World,
  },
  provide() {
    return {
      foo: 234,
      // @ts-ignore
      baz: this.msg
    }
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
  },
  watch: {
      msg(val: string, oldVal: string){
          console.log('msg-change:', val, oldVal);
      },
      person: {
          handler(val: Person, oldVal: Person) {
              console.log('person-change-deep:', val, oldVal);
          },
          deep: true
      },
      
  },
})
export default class ClassApp extends mixins(MyMixin, TestMixin) {
   // init prop
  propMessage!:string
  name!:string
  propB!:string
  propC!:string
  checked!:boolean
  add!:(a:number) => void

  // inital data
  msg: number = 123
  // use prop values for initial data
  helloMsg: string = 'Hello, ' + this.propMessage
  person:Person = { name: 'tk'}


  // refs 申明
  $refs!: {
    helloComponent: Hello
  }

  // 对 动态添加的计算属性 或者 方法添加声明
  count!: number
  doubleCount!: number
  increment!: () => void
  incrementIfOdd!: () => Promise<any>



  // lifecycle hook
  mounted () {
    this.greet()

    console.log(this.count)
    // 根据申明做强校验
    this.add(1);
    // 可推断出该属性有哪些方法
    this.$refs.helloComponent;
  }


  // 计算属性
  get computedMsg () {
    return 'computed ' + this.msg
  }

  get syncName() {
      return this.name;
  }
  set syncName(val:string){
    this.$emit('update:name',val);
  }

  // 方法
  greet () {
    console.log('greeting: ' + this.msg)
    this.$refs.helloComponent.sayHello()
      this.syncName += '1';

      // @ts-ignore
      this.$emit('change', !this.checked);
      this.useMixins();
  }

  onInputChange(...args:any[]) {
    console.log(...args);
    this.$emit('on-input-change', ...args);
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
  useMixins() {
    this.showMyComponentOptions();
    this.showTestComponentOptions();
  }
  // router hook
  beforeRouteLeave (to:any, from:any, next:any) {
   console.log(to, from, next);
  }

}
</script>
