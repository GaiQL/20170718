<template>
  <div id="app">
    <section class="app_top">
    </section>
    <section class="app_content">
      <div class="input_line">
        <label> 机构名称 </label>
        <input type="text" v-model="organization_name" @click="setName"/>
      </div>
    </section>
  </div>
</template>

<script>
import Heihei from './button.vue';
import '../style/css/input.css';

export default {
  name: 'App',
  data () {
    return {
        organization_name:'123123z'
    }
  },
  methods:{
      setName(){
        console.log(this.organization_name)
      }
  },
  components:{
    Heihei
  }
}
</script>
