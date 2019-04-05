import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'

Vue.use(Vuetify)

require('bootstrap');


import $ from "jquery";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'vuetify/dist/vuetify.min.css'

require('propper');

new Vue({
  el: '#app',
  render: h => h(App)
})
