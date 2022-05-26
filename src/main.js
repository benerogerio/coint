import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Ads from 'vue-google-adsense'

Vue.config.productionTip = false

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
