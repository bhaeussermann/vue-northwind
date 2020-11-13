<template>
  <div class="container">
    <h1 class="title is-4">Employees</h1>
    <b-table
      :data="employees"
      default-sort="firstName"
      >
      <b-table-column field="firstName" label="First Name" sortable v-slot="props">
        {{ props.row.firstName }}
      </b-table-column>
      <b-table-column field="lastName" label="Last Name" sortable v-slot="props">
        {{ props.row.lastName }}
      </b-table-column>
      <b-table-column field="title" label="Title" sortable v-slot="props">
        {{ props.row.title }}
      </b-table-column>
    </b-table>
  </div>
</template>
<script src="./employees.ts"></script>
