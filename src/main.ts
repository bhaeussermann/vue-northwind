import Vue from 'vue';
import App from './app.vue';
import router from './router';
import vuetify from './plugins/vuetify';
const injector = require('vue-inject');

import { EmployeesService } from './services/employees-service';
import { ErrorService } from './services/error-service';
import Dialog from './components/dialog/dialog.vue';
import Spinner from './components/spinner.vue';
import DatePicker from './components/date-picker/date-picker.vue';
import EditEmployee from './views/edit-employee/edit-employee.vue';
import ErrorAlert from './components/error-alert/error-alert.vue';

Vue.config.productionTip = false;

Vue.directive('focus', {
  inserted: e => {
    let inputElement = e;
    if (e.tagName !== 'INPUT') {
      const inputDescendants = e.getElementsByTagName('input');
      if (!inputDescendants.length) return;
      inputElement = inputDescendants[0];
    }

    setTimeout(() => inputElement.focus());
  }
});

Vue.use(injector);
injector.service('errorService', ErrorService);
injector.service('employeesService', EmployeesService);

Vue.component('app-error-alert', ErrorAlert);
Vue.component('app-dialog', Dialog);
Vue.component('app-spinner', Spinner);
Vue.component('app-date-picker', DatePicker);
Vue.component('app-edit-employee', EditEmployee);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
