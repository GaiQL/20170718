import Vue from 'vue';
import App from './components/App.vue'

import Calendar from 'vue2-datepick';
Vue.use(Calendar);

new Vue({
  el: '#app',
  components: { App },
  template: '<App />'
})
