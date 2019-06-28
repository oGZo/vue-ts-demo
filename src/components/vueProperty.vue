<template>
<div>
  <p>vue data : {{ count }}</p>
  <ul>
    <li>prop <input type="text" :value="propA"  readonly></li>
    <li>prop  默认值<input type="text" :value="propB"  readonly></li>
    <li>prop.sync <input type="text" v-model="syncedName" @change="onInputChange"></li>
    <li>data.key <input type="text" v-model="person.name"></li>
  </ul>
</div>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop, PropSync, Watch, Emit, Inject, 
// InjectReactive
 } from 'vue-property-decorator'

interface Person {

}
// import { symbol } from './a';

@Component
export default class VueProperty extends Vue {
  @Prop(Number) readonly propA: number | undefined
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
  @PropSync('name', { type: String }) syncedName!: string
  @Model('change', { type: Boolean }) readonly checked!: boolean


  count = 0;
  child = {};
  person = {name: 'ts'};

  @Watch('child')
  onChildChanged(val: string, oldVal: string) {
    console.log('child change', val, oldVal);
  }

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: Person, oldVal: Person) {
    console.log('person deep', val, oldVal);
  } 

  @Watch('person')
  onPersonChanged2(val: Person, oldVal: Person) {
    console.log('normal person', val, oldVal);
  }

  mounted() {
      setTimeout(() => {
        this.child = {};
      });
  }
  

  @Emit()
  onInputChange(e: Event) {
    console.log('e:', e);
    this.syncedName = this.syncedName + 'e';
    if(e.target instanceof HTMLInputElement){
      return e.target.value
    }
    return '';
  }

  
  @Inject() readonly foo!: string
  @Inject() readonly baz!: string
  @Inject({ from: 'optional', default: 'default' }) readonly optional!: string
  // @Inject(symbol) readonly dd!: string
  // @InjectReactive() readonly bar!: any
  // 暂时有问题无法使用
  // @InjectReactive(symbol) one!: string
}
</script>

