## vue typescript 的三种写法

### 第一种  Vue.extend
#### 特点
1. 写法和正常的js预发写vue差不多，且可使用typescript 的类型推断；
2. 可通过@vuedoc/parse 获取其对应的类似jsdoc的注释
   
#### 弊端
1. mixin 组件的属性或方法无法推断
2. 外部传入的方法无法进行有效提示和校验
3. 单纯js对象无法正常按 vue框架的逻辑推断
4. 通过 vuex 注入的方法和字段 无法进行类型推断和校验

### 第二种   vue-class-component

```
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
const AppProps = Vue.extend({
  props: {
    propMessage: String,
    add: Function
  }
})

@Component({
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
    ...mapActions(['incrementIfOdd'])
  }
})
export default class App extends AppProps {
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

```

#### 特点
1. 以类的形式写代码
2. 能够对mixin的组件进行类型推断和校验
3. 能够对vuex注入的属性和方法进行推断和校验
   
#### 弊端
1. 书写方式和js下写组件有很多差异, 增加学习成本;
2. 外部传入的属性需要手动申明， 增加书写申明成本;
3. 组件的data  method  computed 生命周期为一个层级 未区分开，需要定规则将其分块区分;
4. watch filter 等 的funtion中  编辑器无法提示该组件自有的方法和属性, 开发便利性下降;



### 第三种