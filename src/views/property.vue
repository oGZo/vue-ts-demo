<template>
  <div>
    <input v-model="msg">
    <p>prop: propMessage {{ propMessage }}</p>
    <p>prop: propB {{ propB | reverse }}</p>
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
import Hello from '../components/Hello.vue'
import World from '../components/World'
import MyMixin from "../mixins/My.vue";
import TestMixin from "../mixins/test.vue";

import { Component, Model, Prop, PropSync, Watch, Emit, Provide , Mixins
// InjectReactive
 } from 'vue-property-decorator'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

interface Person {
  name: string
}

@Component({
  components: {
    Hello,
    World,
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
  filters: {
    reverse(v:string){
        return v && v.split('').reverse().join('') || '';
    }
  },
})

export default class PropertyApp extends Mixins(MyMixin,TestMixin) {
   // init prop
  @Prop(String) readonly propMessage!: string
  @Prop(Function) readonly add!: (a: number) => void
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
  
  @PropSync('name', { type: String }) syncName!: string


  @Model('change', { type: Boolean }) readonly checked!: boolean




  // inital data
  msg: number = 123
  person: Person = { name: 'ck' }

  // use prop values for initial data
  helloMsg: string = 'Hello, ' + this.propMessage



  // refs 申明
  $refs!: {
    helloComponent: Hello
  }

  @Provide() foo = 234;
  @Provide() baz = this.msg;

  // 对 动态添加的计算属性 或者 方法添加声明
  count!: number
  doubleCount!: number
  increment!: () => void
  incrementIfOdd!: () => Promise<any>


  @Watch('msg')
  onChildChanged(val: string, oldVal: string) {
    console.log('msg-change:', val, oldVal);
  }
 
  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: Person, oldVal: Person) {
    console.log('person-change-deep:', val, oldVal);

  }
 

  // lifecycle hook
  mounted () {
    this.greet()
    // 根据申明做强校验
    this.add(1);
    // 可推断出该属性有哪些方法
    this.$refs.helloComponent;
  }

  // 计算属性
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // 方法
  greet () {
    console.log('greeting: ' + this.msg)
    this.$refs.helloComponent.sayHello()
    this.syncName += '1';

    this.$emit('change', !this.checked);
    this.useMixins();
  }

  @Emit()
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
