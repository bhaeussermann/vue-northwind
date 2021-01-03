<template>
  <div class="container">
    <b-loading :isFullPage="true" v-model="isBusy"></b-loading>
    <div class="title-row">
      <h1 class="title is-4">Employees</h1>
      <b-field class="search">
        <b-input placeholder="Search" v-model="searchString"></b-input>
      </b-field>
    </div>
    <b-button @click="addEmployee">Add</b-button>

    <div v-if="isLoading">
      <b-skeleton></b-skeleton>
      <b-skeleton></b-skeleton>
      <b-skeleton></b-skeleton>
      <b-skeleton></b-skeleton>
      <b-skeleton></b-skeleton>
    </div>

    <b-table v-if="didLoad" :data="filteredEmployees" default-sort="lastName">
      <b-table-column
        field="lastName"
        label="Last Name"
        sortable
        v-slot="props"
        >{{ props.row.lastName }}</b-table-column>
      <b-table-column
        field="firstName"
        label="First Name"
        sortable
        v-slot="props"
        >{{ props.row.firstName }}</b-table-column>
      <b-table-column
        field="title"
        label="Title"
        sortable
        v-slot="props"
        >{{ props.row.title }}</b-table-column>
      <b-table-column
        v-slot="props"
        ><a @click="{{ editEmployee(props.row) }}">Edit</a></b-table-column>
      <b-table-column
        v-slot="props"
        ><a @click="{{ confirmDeleteEmployee(props.row) }}">Delete</a></b-table-column>
    </b-table>

    <b-modal
      v-model="displayEditModal"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
    >
      <template>
        <edit-employee 
          v-bind:employeeId="editedEmployeeId"
          v-on:save="didSave()"
          ></edit-employee>
      </template>
    </b-modal>
  </div>
</template>
<style scoped lang="scss">
@import 'employees.scss';
</style>
<script src="./employees.ts"></script>
