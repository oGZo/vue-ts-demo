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
    <World/>
    <Hello ref="helloComponent"/>
    <p>
      <button @click="greet">use vue sub component hello method: Greet</button>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Hello from "../components/Hello.vue";
import World from "../components/World";

import MyMixin from "../mixins/My.vue";
import TestMixin from "../mixins/test.vue";

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
interface Person {
  name: string
}

export default Vue.extend({
    name: 'NormalApp',
  mixins: [MyMixin, TestMixin],
  model: {
    prop: 'checked',
    event: 'change'
  },
  components: {
    Hello,
    World,
  },
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
  data() {
    let person:Person = { name: 'tk'};
    return {
      msg: "123",
      person,
      helloMsg: "Hello, " + this.propMessage
    };
  },
  // 往子孙组件注入值
  provide() {
    return {
      foo: 234,
      baz: '123' // 不能 使用  this.msg  否则整个组件类型推断会有问题
    };
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
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["doubleCount"]),
    // 一定要申明return  type
    computedMsg(): string {
      return "computed " + this.msg;
    },
    syncName: {
        get ():string {
            return this.name;
        },
        set (val:string){
            this.$emit('update:name',val);
        }
    }
  },
  // 方法
  methods: {
    ...mapMutations(["increment"]),
    ...mapActions(["incrementIfOdd"]),
    greet() {
      console.log("greeting: " + this.msg);
      // 由于ts 不知道该对象的方法所有这里会报错  除非忽略掉该错误
      // @ts-ignore
      this.$refs.helloComponent.sayHello();
      this.syncName += '1';

      // @ts-ignore
      this.$emit('change', !this.checked);
      this.useMixins();
    },

    onInputChange(...args: any[]) {
      console.log(...args);
      // 抛出事件
      this.$emit("on-input-change", ...args);
    },
    // direct dispatch example
    incrementOdd() {
      // @ts-ignore
      this.incrementIfOdd().then((res: any) => {
        console.log("ok", res);
      });
      this.$store.dispatch("incrementIfOdd").then(res => {
        console.log(res);
      });
    },
    useMixins() {
      // @ts-ignore
      this.showMyComponentOptions();
      // @ts-ignore
      this.showTestComponentOptions();
    }
  },
  filters: {
      reverse(v:string){
          return v && v.split('').reverse().join('') || '';
      }
  },
  // lifecycle hook
  mounted() {
    this.greet();
    // 只知道是个方法 如何传参不清楚
    this.add(1);
    // 开发时 无法推断出其有哪些属性或方法，
    this.$refs.helloComponent;
  },
  // router hook
  beforeRouteLeave(to: any, from: any, next: any) {
    console.log(to, from, next);
  }
});
</script>
