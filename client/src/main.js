import Vue          from 'vue'
import App          from './App.vue'
import './registerServiceWorker'
import router       from './router'
import store        from './store'
// import Vuetify from 'vuetify';
import vuetify      from './plugins/vuetify';
import moment       from 'moment'
import momentz      from 'moment-timezone'

import axios        from './plugins/requests.js'
import helper       from './helpers/helpers'
import EventBus     from './event-bus'
import i18n         from './plugins/i18n';
import api          from "./plugins/api"
import logos        from "./helpers/js/logos.js"
import manager      from "./class/managerSmith.js"


//Settings global

Vue.prototype.$Axios            = axios;

Vue.prototype.$moment   = moment;
Vue.prototype.$momentz  = momentz;

// Manager smith
Vue.prototype.$ManagerSmith     = new manager({
    api, 
    i18n,
    helper,    
    EventBus,
    axios,    
    store,
    moment,
    momentz,
    router,
});

// Api
Vue.prototype.$API              = api;

// ConnectionBus
Vue.prototype.$EventBus         = EventBus;   // Testing

// Logos
Vue.prototype.$Logos            = logos;


// helpers
Vue.prototype.$Helper           = helper; 

Vue.config.productionTip        = false;

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
