<template>
  <div class="container">
    <div class="title-row">
      <h1 class="title is-4">Employees</h1>
      <b-field class="search">
        <b-input placeholder="Search" v-model="searchString"></b-input>
      </b-field>
    </div>
    <b-table :data="filteredEmployees" default-sort="firstName">
      <b-table-column
        field="firstName"
        label="First Name"
        sortable
        v-slot="props"
      >
        {{ props.row.firstName }}
      </b-table-column>
      <b-table-column
        field="lastName"
        label="Last Name"
        sortable
        v-slot="props"
      >
        {{ props.row.lastName }}
      </b-table-column>
      <b-table-column field="title" label="Title" sortable v-slot="props">
        {{ props.row.title }}
      </b-table-column>
    </b-table>
  </div>
</template>
<style lang="scss">
@import 'employees.scss';
</style>
<script src="./employees.ts"></script>
