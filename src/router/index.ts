import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import NotFound from '@/views/not-found.vue';
import Employees from '@/views/employees/employees.vue';
import EditEmployee from '@/views/edit-employee/edit-employee.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/employees'
  },
  {
    path: '/employees',
    name: 'employees',
    component: Employees
  },
  {
    path: '/employees/add',
    name: 'add-employee',
    component: EditEmployee
  },
  {
    path: '/employees/:employeeId',
    name: 'edit-employee',
    component: EditEmployee
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
