
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';


@Component
export default class testMixin extends Vue {
  test = 'test-mixin'
  showTestComponentOptions() {
    console.log(this.test);
  }
}
</script>

