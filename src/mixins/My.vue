<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'myMixin',
  data() {
    return {
      my: 'myMixin'
    }
  },
  methods: {
    showMyComponentOptions() {
     console.log(this.my);
   }
  },
})
</script>

