
import Vue from 'vue'



const a = Vue.extend({
  data(){
    return {
      b: 'b',
    }
  },
  methods: {
    getPage() {
      console.log(this.b);
    }
  }
});



export default Vue.extend({
  mixins: [a],
  data(){
    return {
      name: 'b',
    }
  },
  methods: {
    toPage() {
      this.$router.go(-1);
    }
  }
});
