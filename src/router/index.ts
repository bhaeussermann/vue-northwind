import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Employees from '../views/employees.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Employees',
    component: Employees
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
