import Vue from 'vue';
import Buefy from 'buefy';
import App from './app.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp, faArrowLeft, faArrowRight, faExclamationCircle, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { EmployeesService } from './services/employees-service';
const injector = require('vue-inject');

Vue.config.productionTip = false;

library.add(faArrowUp, faArrowLeft, faArrowRight, faExclamationCircle, faCalendar);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas'
});

Vue.use(injector);

Vue.directive('focus', {
  inserted: function(e) {
    let inputElement = e;
    if (e.tagName !== 'INPUT') {
      const inputDescendants = e.getElementsByTagName('input');
      if (!inputDescendants.length) return;
      inputElement = inputDescendants[0];
    }

    inputElement.focus();
  }
});

injector.service('employeesService', EmployeesService);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
