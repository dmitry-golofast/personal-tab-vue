import Vue from 'vue'
import App from './App'
import ContactsList from "./components/ContactsList";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {
    App,
    ContactsList
  },
  template: '<App/>'
}).$mount('#app')
