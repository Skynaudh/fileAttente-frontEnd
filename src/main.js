import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";

import vuetify from "./plugins/vuetify";

import { routes } from "./Routes";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Portail from "./Portail";
import Axios from 'axios';
// import Chart from 'chart.js';
// import Chartkick from 'vue-chartkick';


/* eslint-disable */
window.Vue = require("vue");
window.Vue = require("vue");
window.axios = require("axios");
Vue.use(VueSweetalert2);
Vue.use(Vuelidate);
Vue.use(VueRouter);
// Vue.use(Chartkick.use(Chart));
Vue.config.productionTip = false;

Vue.filter('NumTicket', function(value){
  if(value==null || value== 0){
    return value = 'Pas de Ticket'
  }
  else{
    return 'Ticket: '+ value;
  }
})


let role = localStorage.getItem('role')
Vue.prototype.$Portail = new Portail(role);
Vue.prototype.$http = Axios;





const router = new VueRouter({ routes, mode: "history"});

new Vue({
  router,
  store,
  Vuelidate,
  vuetify,
  render: h => h(App)
}).$mount("#app");