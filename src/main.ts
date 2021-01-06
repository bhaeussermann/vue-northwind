import Vue from 'vue';
import App from './app.vue';
import router from './router';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp, faArrowLeft, faArrowRight, faExclamationCircle, faExclamationTriangle, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { EmployeesService } from './services/employees-service';
import { ErrorService } from './services/error-service';
import EditEmployee from './views/edit-employee/edit-employee.vue';
const injector = require('vue-inject');

Vue.config.productionTip = false;

library.add(faArrowUp, faArrowLeft, faArrowRight, faExclamationCircle, faExclamationTriangle, faCalendar);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultIconComponent: 'font-awesome-icon'
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

    setTimeout(() => inputElement.focus());
  }
});

injector.service('errorService', ErrorService);
injector.service('employeesService', EmployeesService);

Vue.component('edit-employee', EditEmployee);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
