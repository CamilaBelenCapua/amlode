import Vue from 'vue'
import App from './App.vue'


//import Router
import { router } from './router'

//import estilos
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'popper.js'
import 'bootstrap'

//import form
import './form'

//import AXIOS
import './axios'

//import VUEX
import store from './store'

//import googlemaps
import * as VueGoogleMaps from 'vue2-google-maps' // Import package

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyC2gvsuHDRpLtgXrRKKdn2tyBPrtAaJMXk",
    libraries: "places"
  }
});

//import googleAuth2
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '1064672349955-6ag6kufjdk22ekgbitse4i35gi9tnabp.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
  fetch_basic_profile:true,
}
Vue.use(GAuth, gauthOption)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

