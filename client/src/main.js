import Vue from 'vue'
import App from './App.vue'


import enums from 'vue-enums'

// eslint-disable-next-line no-unused-vars
import vuetify from "./plugins/Vuetify";

Vue.use(enums)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
